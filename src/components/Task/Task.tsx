import React, {useState }  from 'react'
import { useAppDispatch } from '../../hook'
import {changeTask, changeTodoTitle, addCurrentDragObject} from "../../feauters/todo/todoSlice" 
import GambIcon from "../../assets/icons/hamburger.png"
import "./task.scss"; 
import  {Popup}  from "../Popup/Popup"  

interface Todo { 
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean,    
  weight: number,
  setNewStatusForDragItem: (status: string) => void,
}
 

export const Task: React.FC<Todo> = ({ id, title, status, project, archive, deleted, weight, setNewStatusForDragItem} ) => {  
  const [taskTitle, setTaskTitle] = useState(title)
  const [showPopup, setShowPopup] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
 

  const dispatch = useAppDispatch(); 
 
   
  const onHandlePopup = () => {
    setShowPopup(!showPopup)
  }
  const onHamburgerClick = (event:any ) => {
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowPopup(!showPopup)
  }

  const onChangeProjectTitle = () =>{  
    dispatch(changeTask({project , id, archive, deleted, title: taskTitle, status, weight}));
  }

  const onHandleChangeTitle = (e:any) => {
    dispatch(changeTodoTitle({id, title: e.target.value}));
    setTaskTitle(e.target.value) 
  }

 const dragStartHandler = (e:any) =>{   
  dispatch(addCurrentDragObject({ id, title, status, project, archive, deleted}))
  }

 const dragEndHandler = (e:any) =>{ 
  e.target.style.boxShadow = "none"
 }
 const dragLeaveHandler = (e:any) =>{ 
  e.target.style.boxShadow = "none"
 }
 const dragOverHandler = (e:any) =>{
  e.preventDefault();
  if (e.target.className === "task-container__text") {
    e.target.style.boxShadow = "0 4px 3px black"
  } 
 }
 
 const dropHandler = (e:any,  ) =>{ 
  e.preventDefault();
  e.target.style.boxShadow = "none";   
  setNewStatusForDragItem(status);
 } 
   
  return (  
    <div 
      className='task-container' 
    >  
      <div className='task-container__header'>
       <img id={id}  src={GambIcon} alt="" onClick={(event)=> onHamburgerClick(event)}/>
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
        weight={weight}  
       />
      </div>

      <textarea   
       onDragStart={(e) => dragStartHandler(e)}
       onDragLeave={(e) => dragLeaveHandler(e)}
       onDragEnd={(e) => dragEndHandler(e)}
       onDragOver={(e) => dragOverHandler(e)}
       onDrop={(e) => dropHandler(e)}
       draggable={true}
          className = "task-container__text" 
          placeholder= "Ввести заголовок для этой карточки" 
          name="" 
          id={id} 
          value={taskTitle} 
          onChange={(e)=>  onHandleChangeTitle(e)} 
          onBlur={onChangeProjectTitle}
          cols ={30}
          rows ={3}>
            {title}
          </textarea> 
    </div> 
  )
}
