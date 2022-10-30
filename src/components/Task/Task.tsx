import React, {useState, useEffect }  from 'react'
import { useAppDispatch, useAppSelector} from '../../hook'
import {changeTaskTitle, addDragObject, addDropObject, changeOrderTodos, clearDragArray, clearDropArray     } from "../../feauters/todo/todoSlice" 
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
  order: number, 
  setNewStatusForDragItem: (status: string) => void,
}
 

export const Task: React.FC<Todo> = ({ id, title, status, project, archive, deleted, order,  setNewStatusForDragItem  } ) => {  
  const [taskTitle, setTaskTitle] = useState(title)
  const [showPopup, setShowPopup] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });   
  const dragItem = useAppSelector(store => store.todo.dragItem);  
  const dropItem = useAppSelector(store => store.todo.dropItem);  
  const dispatch = useAppDispatch();  

  const onHandlePopup = () => {
    setShowPopup(!showPopup)
  }
  const onHamburgerClick = (event:any ) => {
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowPopup(!showPopup)
  }

  const onHandleChangeTitle = (e:any) => { 
    setTaskTitle(e.target.value)
    
  } 
  useEffect(() => {
    dispatch(changeTaskTitle({id, title:taskTitle}));
  },[taskTitle])
 const dragStartHandler = () =>{    
  dispatch(addDragObject({ id }))  
  }

 const dragEndHandler = (e:any) =>{ 
  e.target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)"
 }
 const dragLeaveHandler = (e:any) =>{ 
  e.target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)"
 }
 const dragOverHandler = (e:any) =>{ 
  e.preventDefault(); 
  const targetClass = e.target.className;
  const targetStyle =  e.target.style.boxShadow = "0 4px 3px black"; 
  const currentClass = "task-container__text";
  targetClass ===  currentClass ? targetStyle : null; 
 }
 
 const dropHandler = (e:any,  ) =>{  
  e.preventDefault();
  e.target.style.boxShadow = "1px 1px 0px 1px rgb(0 0 0 / 51%)";   
  dispatch(addDropObject({id}));
  setNewStatusForDragItem(status);
 } 
   
 useEffect(() => {
    const firstItem = dragItem.at(-1);
    const secondItem = dropItem.at(-1);
    if (firstItem && secondItem){ 
      dispatch(changeOrderTodos({first: firstItem, second: secondItem}))
      dispatch(clearDragArray()), dispatch(clearDropArray());
    }
  },[dropItem])

  return (   
    <div className='task-container'>  
      <div className='task-container__header'>
       <img id={id}  src={GambIcon} alt={title} onClick={(event)=> onHamburgerClick(event)}/>
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
        order= {order}
       />
      </div> 
      <textarea   
          onDragStart={() => dragStartHandler()}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)}
          draggable={true}
          className = "task-container__text" 
          placeholder= "Ввести заголовок для этой карточки" 
          name={taskTitle}
          id={id} 
          value={taskTitle} 
          onChange={(e)=>  onHandleChangeTitle(e)} 

          cols ={30}
          rows ={3}>
            {title}
          </textarea> 
    </div>  
  )
}
