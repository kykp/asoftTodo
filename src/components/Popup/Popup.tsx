import React  from 'react'
import "./popup.scss"
import { useAppDispatch, useAppSelector } from '../../hook'
import {changeTask} from "../../feauters/todo/todoSlice"

interface PopupProps {
  trigger: boolean, 
  className?: string, 
  children?: any,  
  anchorPoint: {
    x:number,
    y:number,
  }, 
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean,  
  onHandlePopup: () => void
}
 
export const Popup: React.FC <PopupProps> = (props) => {  
  const filter = useAppSelector(store => store.todo.filters);
  const todo = useAppSelector(store => store.todo.list);
  const dispatch = useAppDispatch(); 

  const onChangeStatusHandler = (event:any ) =>{  
    const currentObject = todo.find(item => item.id === props.id); 
    if (event === "archive" || event === "deleted") { 
      event === "archive" 
      ?dispatch(changeTask({
        id: props.id, 
        status: props.status, 
        archive: !currentObject?.archive, 
        deleted: false,
        title: props.title,
        project: props.project
      })) 
      :dispatch(changeTask({
        id: props.id, 
        status: props.status, 
        archive: false, 
        deleted: !currentObject?.deleted,
        title: props.title,
        project: props.project
      })) 
    } else {
      dispatch(changeTask({
        id: props.id, 
        status: event, 
        archive: false, 
        deleted: false, 
        title: props.title,
        project: props.project
      })) 
    } 
    props.onHandlePopup();
  } 
    
  return props.trigger ? (
    <div className="popup"  onClick={props.onHandlePopup} >
      <div className="popup-inner" style={{ top: props.anchorPoint.y -5, left: props.anchorPoint.x +20 }}>
        <p>Перенести</p>
        { filter !== "archive" && filter !== "deleted"
        ? (
          <>
          <div 
          id="inPlan" 
          className='popup-inner__menu' 
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}>
         Запланировано 
        </div> 
        <div 
          id="inProcess" 
          className='popup-inner__menu'
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >В процессе</div>
        <div 
          id="done" 
          className='popup-inner__menu'
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >Выполнено</div> 
          <br /> 
          <div 
          id="archive" 
          className='popup-inner__menu'
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >Архив</div>
             <div 
          id="deleted" 
          className='popup-inner__menu'
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >Удалить</div>

          <br /> 
          {/* <div 
          id=" " 
          className='popup-inner__menu'
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
          >В другой проект</div> */}
          </>
        )
        : null
      } 
        { filter === "archive"
        ? (
          <>
          <div 
          id="archive" 
          className='popup-inner__menu' 
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}>
         Вернуть 
        </div> 
         <div 
         id="deleted" 
         className='popup-inner__menu'
         onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}
         >Удалить</div>
         </>
        )
        :null
        }
        {filter === "deleted"
        ? (
          <div 
          id="deleted" 
          className='popup-inner__menu' 
          onClick={(event) => onChangeStatusHandler(event.currentTarget.id)}>
         Восстановить 
        </div> 
        )
        :null
        }
         
        <button className="close-btn" onClick={props.onHandlePopup}>x</button>
       
      </div>
    </div>
  ) : null;
};
