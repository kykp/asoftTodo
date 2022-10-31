import React from "react";
import "./workzone.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addTask, changeTaskStatus } from "../../feauters/todo/asyncActions";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../components/Task/Task";
import {
  selectDragItem,
  selectFilters,
  selectTodos,
} from "../../feauters/todo/selectors";

type Todo = {
  id: string;
  title: string;
  status: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
};
export const WorkZone = () => {
  const filter = useAppSelector(selectFilters);
  const todos = useAppSelector(selectTodos);
  const dragItem = useAppSelector(selectDragItem);
  const dispatch = useAppDispatch();

  const addTaskHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const todo = {
      id: uuidv4(),
      title: "",
      status: e.currentTarget.id,
      project: filter,
      archive: false,
      deleted: false,
      order: todos.length + 1,
    };
    dispatch(addTask(todo));
  };

  const setNewStatusForDragItem = (status: string) => {
    const firstItem = dragItem.at(-1);
    if (firstItem?.status !== status) {
      firstItem
        ? dispatch(changeTaskStatus({ id: firstItem?.id, status }))
        : null;
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setNewStatusForDragItem(e.currentTarget.id);
  };

  return (
    <div className="workzone">
      <div className="tasks">
        <div
          className="tasks__item"
          id="inPlan"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <div className="task task__planing">
            <h3 className="task__title">Запланировано</h3>
            {todos.map((el: Todo) => {
              if (
                el.status === "inPlan" &&
                el.project === filter &&
                !el.archive &&
                !el.deleted
              ) {
                return (
                  <Task
                    key={el.id}
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "archive" &&
                el.status === "inPlan" &&
                el.archive
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "deleted" &&
                el.status === "inPlan" &&
                el.deleted
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              }
            })}
          </div>
          {filter !== "archive" && filter !== "deleted" ? (
            <button
              id="inPlan"
              className="tasks__button"
              onClick={(e) => addTaskHandler(e)}
            >
              Добавить задачу
            </button>
          ) : null}
        </div>

        <div
          className="tasks__item"
          id="inProcess"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <div className="task task__process">
            <h3 className="task__title">В процессе</h3>
            {todos.map((el: Todo) => {
              if (
                el.status === "inProcess" &&
                el.project === filter &&
                !el.archive &&
                !el.deleted
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "archive" &&
                el.status === "inProcess" &&
                el.archive
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "deleted" &&
                el.status === "inProcess" &&
                el.deleted
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              }
            })}
          </div>
          {filter !== "archive" && filter !== "deleted" ? (
            <button
              id="inProcess"
              className="tasks__button"
              onClick={(e) => addTaskHandler(e)}
            >
              Добавить задачу
            </button>
          ) : null}
        </div>

        <div
          className="tasks__item"
          id="done"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <div className="task task__done">
            <h3 className="task__title">Выполнено</h3>
            {todos.map((el: Todo) => {
              if (
                el.status === "done" &&
                el.project === filter &&
                !el.archive &&
                !el.deleted
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "archive" &&
                el.status === "done" &&
                el.archive
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              } else if (
                filter === "deleted" &&
                el.status === "done" &&
                el.deleted
              ) {
                return (
                  <Task
                    setNewStatusForDragItem={setNewStatusForDragItem}
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    project={el.project}
                    archive={el.archive}
                    deleted={el.deleted}
                    order={el.order}
                  />
                );
              }
            })}
          </div>
          {filter !== "archive" && filter !== "deleted" ? (
            <button
              id="done"
              className="tasks__button"
              onClick={(e) => addTaskHandler(e)}
            >
              {" "}
              Добавить задачу
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
