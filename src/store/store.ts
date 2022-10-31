import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../feauters/todo/todoSlice";
import projectSlice from "../feauters/project/projectSlice";
export const store = configureStore({
  reducer: {
    todo: todoSlice,
    project: projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
