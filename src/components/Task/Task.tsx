import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  addDragObject,
  addDropObject,
  changeOrderTodos,
  clearDragArray,
  clearDropArray,
} from "../../feauters/todo/todoSlice";
import { changeTaskTitle } from "../../feauters/todo/asyncActions";
import GambIcon from "../../assets/icons/hamburger.png";
import { Popup } from "../Popup/Popup";
import { selectDragItem, selectDropItem } from "../../feauters/todo/selectors";
import "./task.scss";

type Todo = {
  id: string;
  title: string;
  status: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
  setNewStatusForDragItem: (status: string) => void;
};

export const Task = ({
  id,
  title,
  status,
  project,
  archive,
  deleted,
  order,
  setNewStatusForDragItem,
}: Todo) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [showPopup, setShowPopup] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const dragItem = useAppSelector(selectDragItem);
  const dropItem = useAppSelector(selectDropItem);
  const dispatch = useAppDispatch();

  const onHandlePopup = () => {
    setShowPopup(!showPopup);
  };
  const onHamburgerClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowPopup(!showPopup);
  };

  const onHandleChangeTitle = (e: { target: HTMLTextAreaElement }) => {
    setTaskTitle(e.target.value);
  };

  useEffect(() => {
    dispatch(changeTaskTitle({ id, title: taskTitle }));
  }, [taskTitle]);

  const dragStartHandler = () => {
    dispatch(addDragObject({ id }));
  };

  const dragEndHandler = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement;
    target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)";
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement;
    target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)";
  };
  const dragOverHandler = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement;
    e.preventDefault();
    const targetClass = target.className;
    const targetStyle = (target.style.boxShadow = "0 4px 3px black");
    const currentClass = "task-container__text";
    targetClass === currentClass ? targetStyle : null;
  };

  const dropHandler = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement;
    e.preventDefault();
    target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)";
    dispatch(addDropObject({ id }));
    setNewStatusForDragItem(status);
  };

  useEffect(() => {
    const firstItem = dragItem.at(-1);
    const secondItem = dropItem.at(-1);
    if (firstItem && secondItem) {
      dispatch(
        changeOrderTodos({
          dragItem: { id: firstItem.id, order: firstItem.order },
          dropItem: { id: secondItem.id, order: secondItem.order },
        })
      );
      dispatch(clearDragArray()), dispatch(clearDropArray());
    }
  }, [dropItem]);

  return (
    <div className="task-container">
      <div className="task-container__header">
        <img
          id={id}
          src={GambIcon}
          alt={title}
          onClick={(event) => onHamburgerClick(event)}
        />
        <Popup
          id={id}
          title={title}
          status={status}
          project={project}
          archive={archive}
          deleted={deleted}
          onHandlePopup={onHandlePopup}
          anchorPoint={anchorPoint}
          trigger={showPopup}
          order={order}
        />
      </div>
      <textarea
        onDragStart={dragStartHandler}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e)}
        draggable={true}
        className="task-container__text"
        placeholder="Ввести заголовок для этой карточки"
        name={taskTitle}
        id={id}
        value={taskTitle}
        onChange={(e) => onHandleChangeTitle(e)}
        cols={30}
        rows={3}
      >
        {title}
      </textarea>
    </div>
  );
};
