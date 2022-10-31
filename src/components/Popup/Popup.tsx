import React from "react";
import "./popup.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { changeTask } from "../../feauters/todo/asyncActions";
import { selectFilters, selectTodos } from "../../feauters/todo/selectors";

type PopupProps = {
  trigger: boolean;
  className?: string;
  children?: any;
  anchorPoint: {
    x: number;
    y: number;
  };
  id: string;
  title: string;
  status: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
  onHandlePopup: () => void;
};

export const Popup = (props: PopupProps) => {
  const filter = useAppSelector(selectFilters);
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const onChangeStatusHandler = (event: string) => {
    const currentObject = todos.find(
      (item: { id: string }) => item.id === props.id
    );
    if (event === "archive" || event === "deleted") {
      event === "archive"
        ? dispatch(
            changeTask({
              id: props.id,
              status: props.status,
              archive: !currentObject?.archive,
              deleted: false,
              title: props.title,
              project: props.project,
              order: props.order,
            })
          )
        : dispatch(
            changeTask({
              id: props.id,
              status: props.status,
              archive: false,
              deleted: !currentObject?.deleted,
              title: props.title,
              project: props.project,
              order: props.order,
            })
          );
    } else {
      dispatch(
        changeTask({
          id: props.id,
          status: event,
          archive: false,
          deleted: false,
          title: props.title,
          project: props.project,
          order: props.order,
        })
      );
    }
    props.onHandlePopup();
  };

  return props.trigger ? (
    <div className="popup" onClick={props.onHandlePopup}>
      <div
        className="popup-inner"
        style={{ top: props.anchorPoint.y - 5, left: props.anchorPoint.x + 20 }}
      >
        <p>Перенести</p>
        {filter !== "archive" && filter !== "deleted" ? (
          <>
            <div
              id="inPlan"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Запланировано
            </div>
            <div
              id="inProcess"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              В процессе
            </div>
            <div
              id="done"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Выполнено
            </div>
            <br />
            <div
              id="archive"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Архив
            </div>
            <div
              id="deleted"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Удалить
            </div>

            <br />
          </>
        ) : null}
        {filter === "archive" ? (
          <>
            <div
              id="archive"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Вернуть
            </div>
            <div
              id="deleted"
              className="popup-inner__menu"
              onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Удалить
            </div>
          </>
        ) : null}
        {filter === "deleted" ? (
          <div
            id="deleted"
            className="popup-inner__menu"
            onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >
            Восстановить
          </div>
        ) : null}

        <button className="close-btn" onClick={props.onHandlePopup}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
