import React, { useState } from "react";
import { useAppDispatch } from "../../hook";
import { addProject } from "../../feauters/project/asyncActions";
import { v4 } from "uuid";
import styles from "./leftMenu.module.scss";

type PopupProps = {
  trigger: boolean;
  anchorPoint: {
    x: number;
    y: number;
  };
  onHandlePopup: () => void;
};

export const Popup = (props: PopupProps) => {
  const { trigger, anchorPoint, onHandlePopup } = props;
  const [newProjectName, setNewProjectName] = useState("");
  const dispatch = useAppDispatch();

  const onHandleCreateNewProject = () => {
    const newProject = {
      id: v4(),
      project: newProjectName,
      archive: false,
      deleted: false,
      weight: 9,
    };
    dispatch(addProject(newProject));
    onHandlePopup();
    setNewProjectName("");
  };

  return trigger ? (
    <div
      className={`
      ${styles.popup}
      ${styles.popup__left_menu}
      `}
    >
      <div
        className={`
        ${styles.popup_inner}
        ${styles.popup_inner_left_menu}`}
        style={{ top: anchorPoint.y - 5, left: anchorPoint.x + 20 }}
      >
        <p>Введите название нового проекта:</p>
        <input
          type="text"
          placeholder="Ведите название проекта"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.currentTarget.value)}
        />
        <div className={styles.left_menu__buttons}>
          <button
            className={`
            ${styles.button}
            ${styles.left_menu__button}
            `}
            onClick={onHandlePopup}
          >
            Отмена
          </button>
          <button
            disabled={newProjectName.length < 1 ? true : false}
            title={
              newProjectName.length < 1
                ? "Введите название проекта"
                : "Подтвердить"
            }
            className={`
            ${styles.button}
            ${styles.left_menu__button}
            `}
            onClick={onHandleCreateNewProject}
          >
            Ок
          </button>
        </div>

        <button className={styles.close_btn} onClick={onHandlePopup}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
