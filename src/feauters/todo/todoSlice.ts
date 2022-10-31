import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { fetchTasks, addTask } from "./asyncActions";

export const filters = {
  filter: "incomming",
};

export type Todo = {
  id: string;
  title: string;
  status: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
};

type dragAndDrop = {
  id: string;
  order: number;
  status: string;
  title: string;
};

type TodosState = {
  list: Todo[];
  dragItem: dragAndDrop[];
  dropItem: dragAndDrop[];
  filters: string;
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  list: [],
  dragItem: [],
  dropItem: [],
  filters: filters.filter,
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeTodoProject: (
      state,
      action: PayloadAction<{ id: string; project: string }>
    ) => {
      const currentTask = state.list.find(
        (todo) => todo.id === action.payload.id
      );
      const dataProject = action.payload.project;
      if (dataProject !== "archive" && dataProject !== "deleted") {
        if (currentTask) {
          currentTask.project = action.payload.project;
          currentTask.archive = false;
          currentTask.deleted = false;
        }
      }
      if (dataProject === "archive") {
        if (currentTask) {
          currentTask.archive = true;
          currentTask.deleted = false;
        }
      }
      if (dataProject === "deleted") {
        if (currentTask) {
          currentTask.deleted = true;
          currentTask.archive = false;
        }
      }
    },
    changeTodosStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const currentTask = state.list.find(
        (todo) => todo.id === action.payload.id
      );
      if (currentTask) {
        currentTask.status = action.payload.status;
      }
    },
    changeOrderTodos: (
      state,
      action: PayloadAction<{
        dragItem: { id: string; order: number };
        dropItem: { id: string; order: number };
      }>
    ) => {
      let firstItem = state.list.find(
        (task) => task.id === action.payload.dragItem.id
      );
      let secondItem = state.list.find(
        (task) => task.id === action.payload.dropItem.id
      );
      firstItem ? (firstItem.order = action.payload.dropItem.order) : null;
      secondItem ? (secondItem.order = action.payload.dragItem.order) : null;
      state.list.sort((a, b) => a.order - b.order);
    },
    addDragObject: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.list.find((el) => el.id === action.payload.id);
      if (item) {
        state.dragItem.push(item);
      }
    },
    addDropObject: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.list.find((el) => el.id === action.payload.id);
      if (item) {
        state.dropItem.push(item);
      }
    },
    clearDragArray: (state) => {
      state.dragItem = [];
    },
    clearDropArray: (state) => {
      state.dropItem = [];
    },
    clearProject: (state, action: PayloadAction<{ project: string }>) => {
      const newTaskList = state.list.filter(
        (task) => task.project !== action.payload.project
      );
      state.list = newTaskList;
    },
    changeTodoTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const currentTask = state.list.find(
        (task) => task.id === action.payload.id
      );
      if (currentTask) {
        currentTask.title = action.payload.title;
      }
    },
    changeTaskReducer: (state, action: PayloadAction<Todo>) => {
      let currentTask = state.list.find(
        (task) => task.id === action.payload.id
      );
      if (currentTask) {
        currentTask = Object.assign(currentTask, action.payload);
      }
    },
    filterBy: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  changeTodoTitle,
  changeTaskReducer,
  filterBy,
  addDragObject,
  addDropObject,
  clearDragArray,
  clearDropArray,
  clearProject,
  changeOrderTodos,
  changeTodosStatus,
  changeTodoProject,
} = todoSlice.actions;

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
