import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Todo,
  changeTodosStatus,
  changeTodoProject,
  changeTaskReducer,
  changeTodoTitle,
} from "./todoSlice";
import { serverRequestSender } from "../../helpers/serverRequestSender";

export const fetchTasks = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTasks", async (_, { rejectWithValue }) => {
  const response = await serverRequestSender(`http://localhost:5000/tasks/get`);
  if (!response.ok) {
    return rejectWithValue(`server error`);
  }
  const data = await response.json();

  return data;
});

export const addTask = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  "todos/addTask",
  async (
    { id, title, status, project, archive, deleted, order },
    { rejectWithValue }
  ) => {
    const newTask = {
      id,
      title,
      status,
      project,
      archive,
      deleted,
      order,
    };
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/add`,
      {
        newTask,
      }
    );

    if (!response.ok) {
      return rejectWithValue("cant add new project. Server Error");
    }

    return (await response.json()) as Todo;
  }
);
export const changeTaskStatus = createAsyncThunk<
  { id: string; status: string },
  { id: string; status: string },
  { rejectValue: string }
>(
  "todos/changeTaskStatus",
  async ({ id, status }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/changeTaskStatus`,
      { id, status }
    );

    if (!response.ok) {
      return rejectWithValue("cant change task status. Server Error");
    }

    dispatch(changeTodosStatus({ id, status }));
    return (await response.json()) as Todo;
  }
);

export const changeTaskProject = createAsyncThunk<
  { id: string; project: string },
  { id: string; project: string },
  { rejectValue: string }
>(
  "todos/changeTaskStatus",
  async ({ id, project }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/changeTaskProject`,
      { id, project }
    );

    if (!response.ok) {
      return rejectWithValue("cant change task project. Server Error");
    }

    dispatch(changeTodoProject({ id, project }));
    return (await response.json()) as Todo;
  }
);

export const changeTaskTitle = createAsyncThunk<
  { id: string; title: string },
  { id: string; title: string },
  { rejectValue: string }
>(
  "todos/changeTaskStatus",
  async ({ id, title }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/changeTaskTitle`,
      { id, title }
    );

    if (!response.ok) {
      return rejectWithValue("cant change task project. Server Error");
    }

    dispatch(changeTodoTitle({ id, title }));
    return (await response.json()) as Todo;
  }
);

export const changeTask = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  "todos/changeTask",
  async (
    { id, title, status, project, archive, deleted, order },
    { rejectWithValue, dispatch }
  ) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/change`,
      {
        id,
        title,
        status,
        project,
        archive,
        deleted,
        order,
      }
    );

    if (!response.ok) {
      return rejectWithValue("cant add new project. Server Error");
    }

    dispatch(
      changeTaskReducer({ id, title, status, project, archive, deleted, order })
    );
    return (await response.json()) as Todo;
  }
);
