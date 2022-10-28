import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";  

export const filters = {
  filter: "incomming",
};

type Todo = {
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean, 
  weight: number 
}

type Project = {
  project: string,
  id: string,
  archive: boolean,
  deleted: boolean,
  weight:number,
}
 
type TodosState = {
  list: Todo[] , 
  projects: Project[],
  drag: Todo[],
  filters: string, 
  loading: boolean,
  error: string | null, 
}
 
export const fetchProjects = createAsyncThunk<Project[], void, {rejectValue: string}> ("todos/fetchProjects", async (_,{ rejectWithValue}) => {
  const response = await fetch(`/projects/get`)
  if(!response.ok) {
    return rejectWithValue(`server error`)
  }
  const data = await response.json();
  return data;
});

export const addProject = createAsyncThunk<Project, Project, {rejectValue: string}>("todos/addProject", async ({project, id, archive,  deleted,  weight, }, {rejectWithValue}) => {
  const newProject = {
    project,
    id,
    archive,
    deleted,
    weight,
  }
  const response = await fetch(`/projects/add`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify(newProject)   
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  }
  
  return (await response.json()) as Project; 
});


export const changeProjectTitle = createAsyncThunk<{project:string, id:string }, {project:string, id:string }, {rejectValue: string}>("todos/changeProjectTitle", 
async ({project, id }, {rejectWithValue, dispatch}) => {
  const response = await fetch(`/projects/change`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({ project, id })   
  });
 
  if(!response.ok) {
    return rejectWithValue("cant change project. Server Error")
  }

  dispatch(changeProjectName({project,id}))
  return (await response.json()) as Project;  
});

export const delProject = createAsyncThunk<string, string, {rejectValue: string}>("todos/delProject", async (id, {rejectWithValue, dispatch}) => {
   
  const response = await fetch(`/projects/delete`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({id}),
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  } 
  dispatch(filterBy("incomming"));
  return id
});

export const fetchTasks = createAsyncThunk<Todo[], void, {rejectValue: string}> ("todos/fetchTasks", async (_,{ rejectWithValue}) => {
  const response = await fetch(`/tasks/get`)
  if(!response.ok) {
    return rejectWithValue(`server error`)
  }
  const data = await response.json();
  
  return data;
});

export const addTask = createAsyncThunk<Todo, Todo, {rejectValue: string}>("todos/addTask", async ({id, title, status, project, archive, deleted, weight}, {rejectWithValue}) => {
  const newTask = {
    id,
    title,
    status,
    project,
    archive, 
    deleted,
    weight
  }
  const response = await fetch(`/tasks/add`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify(newTask)   
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  }
  
  return (await response.json()) as Todo; 
});

export const changeTask = createAsyncThunk<Todo, Todo, {rejectValue: string}>("todos/changeTask", async ({id, title, status, project, archive, deleted, weight }, {rejectWithValue, dispatch},) => {  
  const response = await fetch(`/tasks/change`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({id, title, status, project, archive, deleted, weight })   
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  }
  
  dispatch(changeTaskReducer({id, title, status, project, archive, deleted, weight }))
  return (await response.json()) as Todo; 
});


const initialState : TodosState = {
  projects: [],
  list: [], 
  drag: [],
  filters: filters.filter,
  loading: false,
  error: null, 
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: { 
    addCurrentDragObject:(state, action) => {
      state.drag.push(action.payload);
    },
    deleteDragArray: (state) =>{
      state.drag = []
    },
    changeTodoTitle: (state, action: PayloadAction<{id:string, title: string}>) => { 
     const currentTask = state.list.find(task => task.id === action.payload.id)
     if (currentTask){
       currentTask.title = action.payload.title;
     }
    },
    changeTaskReducer:(state, action: PayloadAction<Todo>) => {
      const currentTask = state.list.find(task => task.id === action.payload.id)
        if(currentTask){  
          currentTask.id = action.payload.id
          currentTask.title = action.payload.title
          currentTask.status = action.payload.status
          currentTask.project = action.payload.project
          currentTask.archive = action.payload.archive
          currentTask.deleted = action.payload.deleted
          currentTask.weight = action.payload.weight
        }
    },
    filterBy:(state, action) => {
      state.filters = action.payload;
    },
    changeProjectName:(state, action: PayloadAction<{id: string, project:string }>) =>{
      let currentProject = state.projects.find(project => project.id === action.payload.id); 
      if (currentProject){
        currentProject.project = action.payload.project;
      }
    },
  }, 
  extraReducers: (builder)=>{
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(addProject.pending, (state) => {
        state.error = null
      })
      .addCase(addProject.fulfilled, (state, action)=> {
        state.projects.push(action.payload)
      })
      .addCase(delProject.fulfilled, (state,action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })      
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
      }) 
      .addCase(addTask.fulfilled, (state, action) => { 
        state.list.push(action.payload)
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      })
  },  
   
});

export const { changeTodoTitle, changeProjectName,  changeTaskReducer, filterBy, addCurrentDragObject ,deleteDragArray   } = todoSlice.actions;
export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}