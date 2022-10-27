import express, { Request, Response} from "express";

import ProjetSchema  from "./models/Project.js" 
import TaskSchema from "./models/Tasks.js"

const projectRouter = express.Router();  

const getProjects = async (req: Request, res: Response) => { 
  try {
      const projects = await ProjetSchema.find();
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
};

const addProject = async (req: Request, res: Response) => {
    const { project, id, archive, deleted, weight } = req.body;  
    try {
      const newProject = new ProjetSchema({
        project, id, archive, deleted, weight
      }); 
      await newProject.save();
      res.json(newProject);
    } catch (error) { 
      console.log(error);
    }  
  };
  
const changeProject = async (req: Request, res: Response) => {
  const { project, id } = req.body;  
  try {
    await ProjetSchema.findOneAndUpdate({id}, {$set:{project: project}}, {upsert: true}); 
    res.json();
  } catch (error) { 
    console.log(error);
  }  
  };


const deleteProject = async (req: Request, res: Response) => {
    const {id, project} = req.body;   
    try {
      await ProjetSchema.deleteOne({id});
      await TaskSchema.deleteMany({project: id})
      res.json();
    } catch (error) { 
      console.log(error);
    }  
  };
 
projectRouter.post("/add", addProject)
projectRouter.post("/delete", deleteProject)
projectRouter.post("/change", changeProject)
projectRouter.get("/get", getProjects)

export {projectRouter}