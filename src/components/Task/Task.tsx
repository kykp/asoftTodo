import React, {useState}  from 'react'
import { useAppDispatch } from '../../hook'
import {changeTask} from "../../feauters/todo/todoSlice"
import "./task.scss"
import GambIcon from "../../assets/icons/hamburger.png"
 
import  {Popup}  from "../Popup/Popup"

interface Todo { 
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean,  
}


export const Task: React.FC<Todo> = ({ id, title, status, project, archive, deleted } ) => { 
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
    dispatch(changeTask({project , id, archive, deleted, title: taskTitle, status}));
  }

  const onHandleChangeTitle = (e:any) => {
    setTaskTitle(e.target.value) 
  }
 
  return (  
    <div className='task-container'>  
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
       />
      </div>

      <textarea 
          className = "task-container__text" 
          placeholder= "Ввести заголовок для этой карточки" 
          name="" 
          id={id} 
          value={taskTitle} 
          onChange={(e)=>  onHandleChangeTitle(e)}
          onMouseLeave={onChangeProjectTitle}
          onBlur={onChangeProjectTitle}
          cols ={30}
          rows ={3}>
            {title}
          </textarea> 
    </div> 
  )
}
