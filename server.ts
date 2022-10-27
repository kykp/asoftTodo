import express from "express";
import { projectRouter } from "./project.js"; 
import { taskRouter } from "./task.js"; 
import { startBaseMongo } from "./mongoconnect.js";
import bodyParser from "body-parser";
import path from 'path';

let urlencodedParser = bodyParser.urlencoded({ extended: false });

import  cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());  
app.use("/projects", urlencodedParser, projectRouter); 
app.use("/tasks", urlencodedParser, taskRouter); 

app.listen(PORT, () => {
  startBaseMongo();
  console.log(`Server started on port: ${PORT}`);
});
