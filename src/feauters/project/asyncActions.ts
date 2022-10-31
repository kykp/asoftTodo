import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, changeProjectName } from "./projectSlice";
import { clearProject, filterBy } from "../todo/todoSlice";
import { serverRequestSender } from "../../helpers/serverRequestSender";

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("project/fetchProjects", async (_, { rejectWithValue }) => {
  const response = await serverRequestSender(
    "http://localhost:5000/projects/get"
  );
  if (!response.ok) {
    return rejectWithValue(`server error`);
  }
  const data = await response.json();
  return data;
});

export const addProject = createAsyncThunk<
  Project,
  Project,
  { rejectValue: string }
>(
  "project/addProject",
  async ({ project, id, archive, deleted, weight }, { rejectWithValue }) => {
    const newProject = {
      project,
      id,
      archive,
      deleted,
      weight,
    };
    const response = await serverRequestSender(
      `http://localhost:5000/projects/add`,
      newProject
    );
    if (!response.ok) {
      return rejectWithValue("cant add new project. Server Error");
    }
    return (await response.json()) as Project;
  }
);

export const changeProjectTitle = createAsyncThunk<
  { project: string; id: string },
  { project: string; id: string },
  { rejectValue: string }
>(
  "project/changeProjectTitle",
  async ({ project, id }, { rejectWithValue, dispatch }) => {
    const response = await serverRequestSender(
      `http://localhost:5000/projects/change`,
      { project, id }
    );
    if (!response.ok) {
      return rejectWithValue("cant change project. Server Error");
    }
    dispatch(changeProjectName({ project, id }));
    return (await response.json()) as Project;
  }
);

export const delProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("project/delProject", async (id, { rejectWithValue, dispatch }) => {
  const response = await serverRequestSender(
    `http://localhost:5000/projects/delete`,
    { id }
  );

  if (!response.ok) {
    return rejectWithValue("cant add new project. Server Error");
  }
  dispatch(clearProject({ project: id }));
  dispatch(filterBy("incomming"));
  return id;
});
