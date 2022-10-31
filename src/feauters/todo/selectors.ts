import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const getTodos = (store: RootState) => store.todo;
export const getFilters = (store: RootState) => store.todo;
export const getDragItem = (store: RootState) => store.todo;
export const getDropItem = (store: RootState) => store.todo;

export const selectTodos = createSelector(getTodos, (todos) => todos.list);
export const selectFilters = createSelector(
  getFilters,
  (todos) => todos.filters
);
export const selectDragItem = createSelector(
  getDragItem,
  (todos) => todos.dragItem
);
export const selectDropItem = createSelector(
  getDropItem,
  (todos) => todos.dropItem
);
