import React, {useState}  from 'react' 
import { useAppDispatch } from '../../hook' 
import {addProject} from "../../feauters/todo/todoSlice"
import { v4 } from "uuid";
import "./leftMenu.scss"

interface PopupProps {
  trigger: boolean,  
  anchorPoint: {
    x:number,
    y:number,
  }, 
  onHandlePopup: () => void
}

export const Popup: React.FC <PopupProps> = (props) => { 
  const [newProjectName, setNewProjectName] = useState("")
  const dispatch = useAppDispatch(); 
 
  const onHandleCreateNewProject = () => { 
    const newProject = { id : v4(), project: newProjectName, archive: false, deleted: false, weight: 0}  
    dispatch(addProject(newProject));
    props.onHandlePopup();
    setNewProjectName("")
  }

  return props.trigger ? (
    <div className="popup popup__left-menu">
      <div className="popup-inner popup-inner_left-menu" style={{ top: props.anchorPoint.y -5, left: props.anchorPoint.x +20 }}> 
      <p>Введите название нового проекта:</p>
      <input 
        type="text" 
        placeholder='Ведите название проекта'
        value={newProjectName}
        onChange={(e)=> setNewProjectName(e.currentTarget.value)}
        />
        <div className='left-menu__buttons'>
        <button 
            className='button left-menu__button' 
            onClick={props.onHandlePopup} 
            >Отмена</button>
        <button 
            className='button left-menu__button'
            onClick={onHandleCreateNewProject}
            >Ок</button>
        </div>
       
      <button className="close-btn" onClick={props.onHandlePopup}>x</button> 
      </div>
    </div>
  ) : null;
};
