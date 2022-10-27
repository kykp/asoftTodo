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
    const { id, title, status, project, archive, deleted } = req.body;  
    try {
      const newTask = new TaskSchema({
        id, title, status, project, archive, deleted
      }); 
      await newTask.save();
      res.json(newTask);
    } catch (error) { 
      console.log(error);
    }  
  };
 
  const changeTask = async (req: Request, res: Response) => {
    const { id, title, status, project, archive, deleted } = req.body;  
    try {
        await TaskSchema.findOneAndUpdate({id},{$set:{title, status, project, archive, deleted
        }});  
      res.json();
    } catch (error) { 
      console.log(error);
    }  
  };


const deleteTask = () => {}  



taskRouter.post("/add", addTask)
taskRouter.post("/change", changeTask)
taskRouter.post("/delete", deleteTask)
taskRouter.get("/get", getTasks)

export {taskRouter}