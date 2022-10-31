import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { fetchProjects, addProject, delProject } from "./asyncActions";

export type Project = {
  project: string;
  id: string;
  archive: boolean;
  deleted: boolean;
  weight: number;
};

type ProjectState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    changeProjectName: (
      state,
      action: PayloadAction<{ id: string; project: string }>
    ) => {
      let currentProject = state.projects.find(
        (project) => project.id === action.payload.id
      );
      if (currentProject) {
        currentProject.project = action.payload.project;
      }
    },
  },
  extraReducers: (builder) => {
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
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(delProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { changeProjectName } = projectSlice.actions;
export default projectSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
