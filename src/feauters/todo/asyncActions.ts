import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Todo,
  changeTodoProject,
  changeOrderTodos,
  changeTodoTitle,
  changeTodoComplited,
  changeTodoDeleted,
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
    { id, title, project, archive, deleted, order },
    { rejectWithValue }
  ) => {
    const newTask = {
      id,
      title,
      project,
      archive,
      deleted,
      order,
    };
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/add`,
      newTask
    );

    if (!response.ok) {
      return rejectWithValue("cant add new project. Server Error");
    }

    return (await response.json()) as Todo;
  }
);

export const deleteTask = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>("todos/changeTask", async ({ id }, { rejectWithValue, dispatch }) => {
  const response = await serverRequestSender(
    `http://localhost:5000/tasks/delete`,
    { id }
  );

  if (!response.ok) {
    return rejectWithValue("cant delete task. Server Error");
  }

  // dispatch(changeTodosStatus({ id }));
  return (await response.json()) as Todo;
});

export const changeTaskComplited = createAsyncThunk<
  { id: string; archive: boolean },
  { id: string; archive: boolean },
  { rejectValue: string }
>(
  "todos/changeTaskComplited",
  async ({ id, archive }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/changeTaskCompleted`,
      { id, archive }
    );

    if (!response.ok) {
      return rejectWithValue("cant change task completed. Server Error");
    }

    dispatch(changeTodoComplited({ id, archive }));
    return (await response.json()) as Todo;
  }
);

export const changeTaskDeleted = createAsyncThunk<
  { id: string; deleted: boolean },
  { id: string; deleted: boolean },
  { rejectValue: string }
>(
  "todos/changeTaskComplited",
  async ({ id, deleted }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/tasks/changeTaskDeleted`,
      { id, deleted }
    );

    if (!response.ok) {
      return rejectWithValue("cant change task deleted. Server Error");
    }

    dispatch(changeTodoDeleted({ id, deleted }));
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

// export const changeTaskOrder = createAsyncThunk<
//   { id: string; order: number },
//   { id: string; order: number },
//   { rejectValue: string }
// >(
//   "todos/changeTaskStatus",
//   async ({ id, order }, { rejectWithValue, dispatch }) => {
//     const response = await serverRequestSender(
//       `http://localhost:5000/tasks/changeTaskTitle`,
//       { id, order }
//     );

//     if (!response.ok) {
//       return rejectWithValue("cant change task project. Server Error");
//     }

//     dispatch(
//       changeOrderTodos({ dragItem: { id, order }, dropItem: { id, order } })
//     );
//     return (await response.json()) as Todo;
//   }
// );

// export const changeTask = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
//   "todos/changeTask",
//   async (
//     { id, title, project, archive, deleted, order },
//     { rejectWithValue, dispatch }
//   ) => {
//     const response = await serverRequestSender(
//       `http://localhost:5000/tasks/change`,
//       {
//         id,
//         title,
//         project,
//         archive,
//         deleted,
//         order,
//       }
//     );

//     if (!response.ok) {
//       return rejectWithValue("cant add new project. Server Error");
//     }

//     dispatch(
//       changeTaskReducer({
//         id,
//         title,
//         project,
//         archive,
//         deleted,
//         order,
//       })
//     );
//     return (await response.json()) as Todo;
//   }
// );
