import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook";
import { filterBy, clearDragArray } from "../../feauters/todo/todoSlice";
import { changeTaskProject } from "../../feauters/todo/asyncActions";
import { Popup } from "./Popup";
import { ProjecPopup } from "./ProjecPopup";
import PenImg from "../../assets/icons/hamburger.png";
import { selectFilters, selectDragItem } from "../../feauters/todo/selectors";
import { selectProjects } from "../../feauters/project/seclectors";
import styles from "./leftMenu.module.scss";

export const LeftMenu = () => {
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [activeButton, setActiveButton] = useState("incomming");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupProject, setShowPopupProject] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const projects = useAppSelector(selectProjects);
  const filter = useAppSelector(selectFilters);
  const dragItem = useAppSelector(selectDragItem);

  const dispatch = useAppDispatch();

  const onHandleCurrentProject = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setActiveButton(e.currentTarget.id);
    setCurrentProjectId(e.currentTarget.id);
    dispatch(filterBy(e.currentTarget.id));
  };
  const onHandleAddNewProject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorPoint({ x: e.pageX, y: e.pageY });
    setShowPopup(!showPopup);
  };
  const onHandlePopup = () => {
    setShowPopup(!showPopup);
  };
  const onHandlePopupProject = () => {
    setShowPopupProject(!showPopupProject);
  };

  let newProjects = [...projects].sort((a, b) => a.weight - b.weight);

  const onHandleLeftMenuProjectsClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setAnchorPoint({ x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    setActiveButton(filter);
  }, [filter]);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setNewStatusForDragItem(e.currentTarget.id);
  };

  const setNewStatusForDragItem = (project: string) => {
    const item = dragItem.at(-1);
    if (item) {
      dispatch(changeTaskProject({ id: item.id, project }));
      dispatch(clearDragArray());
    }
  };

  return (
    <div className={styles.left_menu}>
      <h2>Проекты</h2>
      <ul className={styles.projects_list}>
        {newProjects.map((el) => (
          <div
            id={el.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            key={el.project}
            className={styles.projects_list__cover}
          >
            <li
              title={el.project}
              className={`
              ${styles.left_menu__button}
              ${
                activeButton === el.id ? styles.left_menu__button_active : null
              } 
              `}
              id={el.id}
              onClick={(e) => onHandleCurrentProject(e)}
            >
              {el.project}
            </li>
            {activeButton === el.id &&
            el.id !== "incomming" &&
            el.id !== "archive" &&
            el.id !== "deleted" ? (
              <img
                id={el.id}
                style={{ visibility: "visible" }}
                className={styles.projects_list__pencil_img}
                src={PenImg}
                onClick={(e) => {
                  onHandlePopupProject();
                  onHandleLeftMenuProjectsClick(e);
                }}
                alt="burger-menu"
              />
            ) : (
              <img
                style={{ visibility: "hidden" }}
                className={styles.projects_list__pencil_img}
                src={PenImg}
                alt="burger-menu"
              />
            )}
          </div>
        ))}
      </ul>

      <button
        className={`
        ${styles.button}
        ${styles.left_menu__button}
        `}
        onClick={(e) => onHandleAddNewProject(e)}
      >
        Добавить проект
      </button>
      <Popup
        trigger={showPopup}
        anchorPoint={anchorPoint}
        onHandlePopup={onHandlePopup}
      />
      <ProjecPopup
        trigger={showPopupProject}
        anchorPoint={anchorPoint}
        onHandlePopupProject={onHandlePopupProject}
        id={currentProjectId}
      />
    </div>
  );
};
