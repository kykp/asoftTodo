import express, { Request, Response} from "express"; 

import TaskSchema from "./models/Tasks.js"

const taskRouter = express.Router();  
 
const getTasks = async (req: Request, res: Response) => { 
    try {
        const tasks = await TaskSchema.find();
        res.json(tasks);
      } catch (error) {
        console.log(error);
      }
  };

  const addTask = async (req: Request, res: Response) => {
    const { id, title, status, project, archive, deleted, order} = req.body;  
    try {
      const newTask = new TaskSchema({
        id, title, status, project, archive, deleted , order }); 
      await newTask.save();
      res.json(newTask);
    } catch (error) { 
      console.log(error);
    }  
  };
 
  const changeTask = async (req: Request, res: Response) => {
    const { id, title, status, project, archive, deleted , order   } = req.body;  
    try {
        await TaskSchema.findOneAndUpdate({id},{$set:{title, status, project, archive, deleted, order }});  
      res.json();
    } catch (error) { 
      console.log(error);
    }  
  };

const changeTaskStatus = async (req: Request, res: Response) => {
  const {id, status} = req.body; 
  try {
    await TaskSchema.findOneAndUpdate({id}, {$set: {status}});
    res.json()
  } catch (error) {
    console.log(error);
  }
 }

 const changeTaskProject = async (req: Request, res: Response) => {
  const {id, project} = req.body; 
  try { 
      if(project === "archive") {
        await TaskSchema.findOneAndUpdate({id}, {$set: {archive: true, deleted: false}});
      }
      if(project === "deleted") {
        await TaskSchema.findOneAndUpdate({id}, {$set: {deleted: true, archive: false}});
      }  
     if (project !== "archive" && project !== "deleted") {
      await TaskSchema.findOneAndUpdate({id}, {$set: {project, deleted: false, archive: false}});
      } 
    res.json()
  } catch (error) {
    console.log(error);
  }
 } 
 
 const changeTaskTitle = async (req: Request, res: Response) => {
  const {id, title} = req.body; 
  try {
    await TaskSchema.findOneAndUpdate({id}, {$set: {title}});
    res.json()
  } catch (error) {
    console.log(error);
  }
 }
  
  
taskRouter.post("/add", addTask)
taskRouter.post("/changeTaskTitle", changeTaskTitle)
taskRouter.post("/changeTaskStatus", changeTaskStatus)
taskRouter.post("/changeTaskProject", changeTaskProject)
taskRouter.post("/change", changeTask) 
taskRouter.get("/get", getTasks)

export {taskRouter}