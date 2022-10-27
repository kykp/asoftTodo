import React, { useState, useEffect } from "react";
import "./workzone.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addTask } from "../../feauters/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../components/Task/Task";    

type Todo = {
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean,    
}
export const WorkZone  = () => {
  const [currentPage, setCurrentPage]=useState("incomming")

  const filter = useAppSelector(store => store.todo.filters);
  const todos = useAppSelector(store => store.todo.list);
  const dispatch = useAppDispatch();  

 
  useEffect(()=>{
    setCurrentPage(filter)
  },[filter]) 

  const addTodoHandler = (e: any) => { 
    const todo = {
      id: uuidv4(),
      title: "",
      status: e.currentTarget.id,
      project: filter,
      archive: false,
      deleted: false,
    }; 
    dispatch(addTask(todo));
  };
    
  return (
    <div className="workzone">
      <div className="tasks">
        <div className="tasks__item"> 
          <div className="task task__planing"> 
            <h3 className="task__title">Запланировано</h3>
            {todos.map((el: Todo) => {  
              if (el.status === "inPlan" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              } else if (filter === "archive" && el.status === "inPlan" && el.archive){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              } else if (filter === "deleted" && el.status === "inPlan" && el.deleted){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} />
                )
              }
            })}
          </div>  
            { 
            filter !== "archive" && filter !== "deleted" ?
             (<button 
             id="inPlan" 
             className="tasks__button" 
             onClick={(e) => addTodoHandler(e)}> 
                   Добавить задачу
           </button>)
           : null
            } 

        </div>

        <div className="tasks__item">
          <div className="task task__process">
            <h3 className="task__title">В процессе</h3>
            {todos.map((el: Todo) => { 
              if (el.status === "inProcess" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              } else if (filter === "archive" && el.status === "inProcess" && el.archive){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} />
                )
              } else if (filter === "deleted" && el.status === "inProcess" && el.deleted){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              }
            })}
          </div>
          {
            filter !== "archive" && filter !== "deleted" ?
            <button id="inProcess" className="tasks__button" onClick={(e) => addTodoHandler(e)}> Добавить задачу</button>
            : null
          }
          
        </div>

        <div className="tasks__item">
          <div className="task task__done">
            <h3 className="task__title">Выполнено</h3>
            {todos.map((el: Todo) => { 
              if (el.status === "done" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              } else if (filter === "archive" && el.status === "done" && el.archive){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              } else if (filter === "deleted" && el.status === "done" && el.deleted){
                return (
                  <Task key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  />
                )
              }
            })}
          </div>
          {
          filter !== "archive" && filter !== "deleted" ?
          <button id="done" className="tasks__button" onClick={(e) => addTodoHandler(e)}> Добавить задачу</button>
          : null
        } 
        </div>
      </div>
    </div>
  );
};
