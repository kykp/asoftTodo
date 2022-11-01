import React from "react";
import styles from "./popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { changeTaskDeleted } from "../../feauters/todo/asyncActions";
import { selectFilters, selectTodos } from "../../feauters/todo/selectors";
import { PopupProps } from "./typeProps";

export const Popup = (props: PopupProps) => {
  const { id, deleted } = props;
  const filter = useAppSelector(selectFilters);
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  return props.trigger ? (
    <div className={styles.popup} onClick={props.onHandlePopup}>
      <div
        className={styles.popup_inner}
        style={{ top: props.anchorPoint.y - 5, left: props.anchorPoint.x + 20 }}
      >
        <p>Выберите действие</p>
        {filter !== "archive" && filter !== "deleted" ? (
          <>
            <div
              id="deleted"
              className={styles.popup_inner__menu}
              onClick={() =>
                dispatch(changeTaskDeleted({ id, deleted: !deleted }))
              }
            >
              Удалить
            </div>
          </>
        ) : null}
        {filter === "archive" ? (
          <>
            <div
              id="deleted"
              className={styles.popup_inner__menu}
              // onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
            >
              Удалить
            </div>
          </>
        ) : null}

        {filter === "deleted" ? (
          <div
            className={styles.popup_inner__menu}
            onClick={() =>
              dispatch(changeTaskDeleted({ id, deleted: !deleted }))
            }
          >
            Восстановить
          </div>
        ) : null}
        <button className={styles.close_btn} onClick={props.onHandlePopup}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
