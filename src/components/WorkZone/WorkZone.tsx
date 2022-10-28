import React  from "react";
import "./workzone.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addTask, changeTask, deleteDragArray } from "../../feauters/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../components/Task/Task";      

type Todo = {
  id: string,
  title: string,
  status: string,
  project: string,
  archive: boolean,
  deleted: boolean, 
  weight: number  
}
export const WorkZone  = () => {    
  const filter = useAppSelector(store => store.todo.filters);
  const todos = useAppSelector(store => store.todo.list);
  const drag = useAppSelector(store => store.todo.drag); 
  const dispatch = useAppDispatch();  
  
  
  const addTodoHandler = (e: any) => { 
    const todo = {
      id: uuidv4(),
      title: "",
      status: e.currentTarget.id,
      project: filter,
      archive: false,
      deleted: false,
      weight: 10
    }; 
    dispatch(addTask(todo));
  };
   
  const setNewStatusForDragItem = ( status: string) => {    
    let item = drag.at(-1);
    if (item){
      dispatch(changeTask({
        id: item.id, 
        title: item.title,
        status,   
        project: item.project, 
        archive: item.archive, 
        deleted: item.deleted,
        weight: item.weight
      })); 
    } 
    dispatch(deleteDragArray());
  }


  const dragOverHandler = (e: any) => {
    e.preventDefault(); 
  }
  const dropHandler = (e: any) => {
    e.preventDefault(); 
    setNewStatusForDragItem(e.currentTarget.id) 
  }

  const changePlaceTask = (id: string) =>{
    if (drag.at(-1)?.id === id){
      console.log("сам на себя")
    }  

    const secondTask = todos.filter(todo => todo.id === id);

    let item = drag.at(-1);

    if (item){
      console.log("worker", secondTask[0].weight)
      dispatch(changeTask({
        id: item.id, 
        title: item.title,
        status: item.status,   
        project: item.project, 
        archive: item.archive, 
        deleted: item.deleted,
        weight: secondTask[0].weight -1
      })); 
    } 
    dispatch(deleteDragArray());
 
  } 

  const filterdTodos = [...todos].sort((a,b)=> a.weight-b.weight);  

  console.log(filterdTodos)
  return ( 
    <div className="workzone">
      <div className="tasks" >
        <div  
          className="tasks__item" 
          id="inPlan" 
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)} 
        > 
          <div className="task task__planing"> 
            <h3 className="task__title">Запланировано</h3>
            {filterdTodos.map((el: Todo) => {  
              if (el.status === "inPlan" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task   
                  key={el.id}   
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  weight={el.weight}
                  />
                )
              } else if (filter === "archive" && el.status === "inPlan" && el.archive){
                return (
                  <Task
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  weight={el.weight}/>
                )
              } else if (filter === "deleted" && el.status === "inPlan" && el.deleted){
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} weight={el.weight}/>
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

        <div 
          className="tasks__item" 
          id="inProcess" 
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)} 
        >
          <div className="task task__process">
            <h3 className="task__title">В процессе</h3>
            {todos.map((el: Todo) => { 
              if (el.status === "inProcess" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  weight={el.weight}/>
                )
              } else if (filter === "archive" && el.status === "inProcess" && el.archive){
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} weight={el.weight}/>
                )
              } else if (filter === "deleted" && el.status === "inProcess" && el.deleted){
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted}  weight={el.weight}/>
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

        <div 
          className="tasks__item" 
          id="done" 
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)} 
          >
          <div className="task task__done">
            <h3 className="task__title">Выполнено</h3>
            {todos.map((el: Todo) => { 
              if (el.status === "done" && el.project === filter && !el.archive && !el.deleted ) {
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} weight={el.weight} />
                )
              } else if (filter === "archive" && el.status === "done" && el.archive){
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} weight={el.weight} />
                )
              } else if (filter === "deleted" && el.status === "done" && el.deleted){
                return (
                  <Task 
                  setNewStatusForDragItem={setNewStatusForDragItem} 
                  changePlaceTask={changePlaceTask}
                  key={el.id} id={el.id} title={el.title} status={el.status} project ={el.project} archive={el.archive} deleted= {el.deleted} weight={el.weight} />
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
