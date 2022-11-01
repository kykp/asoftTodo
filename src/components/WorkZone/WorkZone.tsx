import React from "react";
import styles from "./workzone.module.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addTask } from "../../feauters/todo/asyncActions";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../components/Task/Task";
import {
  selectFilters,
  selectTodosByFilter,
} from "../../feauters/todo/selectors";

type Todo = {
  id: string;
  title: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
};

export const WorkZone = () => {
  const filter = useAppSelector(selectFilters);
  const todos = useAppSelector(selectTodosByFilter);
  const dispatch = useAppDispatch();

  const addTaskHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const todo = {
      id: uuidv4(),
      title: "",
      project: filter,
      archive: false,
      deleted: false,
      order: todos.length + 1,
    };
    dispatch(addTask(todo));
  };

  return (
    <div className={styles.workzone}>
      <div className={styles.tasks}>
        <div className={styles.tasks__item}>
          <div
            className={`
            ${styles.task}
            ${styles.task__planing}
            `}
          >
            <h3 className={styles.task__title}>{filter}</h3>
            {todos?.map((todo: Todo) => (
              <Task key={todo.id} {...todo} />
            ))}
          </div>
          {filter !== "archive" && filter !== "deleted" ? (
            <button
              className={styles.tasks__button}
              onClick={(e) => addTaskHandler(e)}
            >
              Добавить задачу
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
