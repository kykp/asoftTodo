import React, { useEffect, useState } from "react";
import styles from "./workzone.module.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addTask } from "../../feauters/todo/asyncActions";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../components/Task/Task";
import {
  selectFilters,
  selectTodos,
  selectTodosByFilter,
} from "../../feauters/todo/selectors";
import { selectProjects } from "../../feauters/project/seclectors";

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
  const todosForOrder = useAppSelector(selectTodos);
  const todos = useAppSelector(selectTodosByFilter);
  const projects = useAppSelector(selectProjects);
  const [projectTitle, setProjectTitle] = useState("Входящие");
  const dispatch = useAppDispatch();

  console.log(todosForOrder.length);
  useEffect(() => {
    const findTitleProject = projects.find((project) => project.id === filter);
    findTitleProject ? setProjectTitle(findTitleProject.project) : null;
  }, [filter]);

  const addTaskHandler = () => {
    const todo = {
      id: uuidv4(),
      title: "",
      project: filter,
      archive: false,
      deleted: false,
      order: todosForOrder.length + 1,
    };
    dispatch(addTask(todo));
  };
  todos.sort((a, b) => a.order - b.order);
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
            <h3 className={styles.task__title}>{projectTitle}</h3>
            {todos?.map((todo: Todo) => (
              <Task key={todo.id} {...todo} />
            ))}
          </div>
          {filter !== "archive" && filter !== "deleted" ? (
            <button className={styles.tasks__button} onClick={addTaskHandler}>
              Добавить задачу
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
