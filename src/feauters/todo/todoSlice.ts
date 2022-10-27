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
  filters: string, 
  loading: boolean,
  error: string | null,
}
 
export const fetchProjects = createAsyncThunk<Project[], void, {rejectValue: string}> ("todos/fetchProjects", async (_,{ rejectWithValue}) => {
  const response = await fetch(`http://localhost:5000/projects/get`)
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
  const response = await fetch(`http://localhost:5000/projects/add`, {
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
  const response = await fetch(`http://localhost:5000/projects/change`, {
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
   
  const response = await fetch(`http://localhost:5000/projects/delete`, {
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
  const response = await fetch(`http://localhost:5000/tasks/get`)
  if(!response.ok) {
    return rejectWithValue(`server error`)
  }
  const data = await response.json();
  
  return data;
});

export const addTask = createAsyncThunk<Todo, Todo, {rejectValue: string}>("todos/addTask", async ({id, title, status, project, archive, deleted}, {rejectWithValue}) => {
  const newTask = {
    id,
    title,
    status,
    project,
    archive, 
    deleted
  }
  const response = await fetch(`http://localhost:5000/tasks/add`, {
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

export const changeTask = createAsyncThunk<Todo, Todo, {rejectValue: string}>("todos/changeTask", async ({id, title, status, project, archive, deleted }, {rejectWithValue, dispatch},) => { 
  
  const response = await fetch(`http://localhost:5000/tasks/change`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({id, title, status, project, archive, deleted })   
  });

  if(!response.ok) {
    return rejectWithValue("cant add new project. Server Error")
  }
  
  dispatch(changeTaskReducer({id, title, status, project, archive, deleted }))
  return (await response.json()) as Todo; 
});


const initialState : TodosState = {
  projects: [],
  list: [], 
  filters: filters.filter,
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: { 
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
        }
    },
    filterBy(state, action) {
      state.filters = action.payload;
    },
    changeProjectName(state, action: PayloadAction<{id: string, project:string }>) {
      let currentProject = state.projects.find(project => project.id === action.payload.id); 
      if (currentProject){
        currentProject.project = action.payload.project;
      }
    }
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

export const { changeTodoTitle, changeProjectName,  changeTaskReducer, filterBy    } = todoSlice.actions;
export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}