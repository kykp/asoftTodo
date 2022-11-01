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

export const selectTodosByFilter = createSelector(
  [selectTodos, selectFilters],
  (allTodos, activeFilter) => {
    if (activeFilter === "incomming") {
      return allTodos.filter((todo) => {
        if (!todo.archive && !todo.deleted && todo.project === activeFilter) {
          return todo;
        }
      });
    } else if (activeFilter === "archive") {
      return allTodos.filter((todo) => todo.archive === true);
    } else if (activeFilter === "deleted") {
      return allTodos.filter((todo) => todo.deleted === true);
    } else {
      return allTodos.filter((todo) => {
        if (!todo.archive && !todo.deleted && todo.project === activeFilter) {
          return todo;
        }
      });
    }
  }
);
