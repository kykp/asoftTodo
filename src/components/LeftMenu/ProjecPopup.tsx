import React, { useState } from "react";
import { useAppDispatch } from "../../hook";
import {
  delProject,
  changeProjectTitle,
} from "../../feauters/project/asyncActions";
import "./leftMenu.scss";

type PopupProps = {
  trigger: boolean;
  anchorPoint: {
    x: number;
    y: number;
  };
  id: string;
  onHandlePopupProject: () => void;
};

export const ProjecPopup = (props: PopupProps) => {
  const { id, anchorPoint, trigger, onHandlePopupProject } = props;
  const [newProjectName, setNewProjectName] = useState("");
  const [needToChangeProjectName, setNeedToChangeProjectName] = useState(false);
  const dispatch = useAppDispatch();

  const onHandleDeleteProject = () => {
    dispatch(delProject(id));
    onHandlePopupProject();
    setNewProjectName("");
    setNeedToChangeProjectName(false);
  };

  const onHandleChangeNameProject = () => {
    dispatch(changeProjectTitle({ project: newProjectName, id }));
    setNewProjectName("");
    setNeedToChangeProjectName(false);
    onHandlePopupProject();
  };

  const letsChangeNameProject = () => {
    setNeedToChangeProjectName(true);
  };

  return trigger ? (
    <div className="popup popup__left-menu">
      <div
        className="popup-inner"
        style={{ top: anchorPoint.y, left: anchorPoint.x }}
      >
        {!needToChangeProjectName ? (
          <>
            <p>Выберите действие :</p>
            <button
              className="button left-menu__button popup-inner__menu"
              onClick={letsChangeNameProject}
            >
              Изменить
            </button>
            <button
              className="button left-menu__button popup-inner__menu"
              onClick={onHandleDeleteProject}
            >
              Удалить
            </button>
          </>
        ) : (
          <>
            <p>Введите новое имя проекта</p>
            <input
              className="projecPopup__input"
              type="text"
              placeholder="Ведите название проекта"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.currentTarget.value)}
            />
            <div className="left-menu__buttons">
              <button
                className="button left-menu__button"
                onClick={onHandlePopupProject}
              >
                Отмена
              </button>
              <button
                className="button left-menu__button"
                onClick={onHandleChangeNameProject}
              >
                Ок
              </button>
            </div>
          </>
        )}
        <button className="close-btn" onClick={onHandlePopupProject}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
