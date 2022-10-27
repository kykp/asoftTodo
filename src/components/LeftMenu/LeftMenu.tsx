import {useState, useEffect} from 'react' 
import { useAppSelector, useAppDispatch } from '../../hook' 
import { filterBy } from '../../feauters/todo/todoSlice'
import { Popup } from './Popup' 
import { ProjecPopup } from './ProjecPopup'
import PenImg from "../../assets/icons/hamburger.png"
import "./leftMenu.scss"
 
export const LeftMenu = () => {    
  const [currentProjectId, setCurrentProjectId] = useState("")
  const [activeButton, setActiveButton]=useState("incomming"); 
  const [showPopup, setShowPopup] = useState(false)
  const [showPopupProject, setShowPopupProject] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const projects = useAppSelector(state => state.todo.projects);  
  const filter = useAppSelector(state => state.todo.filters);  

  const dispatch = useAppDispatch();     
 
  const onHandleCurrentProject = (e: any)=>{  
    setActiveButton(e.currentTarget.id);
    setCurrentProjectId(e.currentTarget.id);
    dispatch(filterBy(e.currentTarget.id))
  }
  const onHandleAddNewProject = (event: any) => {
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShowPopup(!showPopup)
  }
  const onHandlePopup = () => {
    setShowPopup(!showPopup)
  }    
  const onHandlePopupProject= () => { 
    setShowPopupProject(!showPopupProject)
  } 

  let newProjects = [...projects].sort((a,b)=> a.weight - b.weight); 
  const onHandleLeftMenuProjectsClick = (event: any ) =>{
    setAnchorPoint({ x: event.pageX, y: event.pageY }); 
  }
  
  useEffect(() => {
    setActiveButton(filter)
  },[filter])

  return ( 
        <div className='left-menu'>
          <h2>Проекты</h2>  
          <ul className='projects-list'>  
          {newProjects.map(el => ( 
            <div  key={el.project} className='projects-list__cover'> 
              <li title={el.project}className= {activeButton === el.id? "left-menu__button left-menu__button_active" : "left-menu__button"} id={el.id} onClick={(e) => onHandleCurrentProject(e)}>{el.project}</li>
              {activeButton === el.id &&
              el.id !== "incomming" &&  
              el.id !== "archive" && 
              el.id !== "deleted"?
              <img  
              id={el.id}
              style={{visibility:"visible"}}  
              className='projects-list__pencil-img' 
              src={PenImg} 
              onClick={(e) => {
                onHandlePopupProject();
                onHandleLeftMenuProjectsClick(e);
              }}
              alt="burger-menu" />
              :
              <img  
              style={{visibility:"hidden"}}  
              className='projects-list__pencil-img' 
              src={PenImg} 
              alt="burger-menu" />
              } 

            </div>
          ))}
          </ul>
         
          <button className='button left-menu__button'
            onClick={(event) => onHandleAddNewProject(event)}
            >Добавить проект 
            </button>
            <Popup trigger={showPopup} anchorPoint={anchorPoint} onHandlePopup={onHandlePopup}/>
            <ProjecPopup 
              trigger={showPopupProject}
              anchorPoint={anchorPoint} 
              onHandlePopupProject={onHandlePopupProject} 
              id={currentProjectId} 
              />
        </div> 
  )
}
