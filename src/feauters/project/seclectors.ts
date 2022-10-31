import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const getProjects = (store: RootState) => store.project;

export const selectProjects = createSelector(
  getProjects,
  (projects) => projects.projects
);
