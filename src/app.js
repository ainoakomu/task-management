//importataan taskRepo ja taskService
const { createTaskRepo } = require("./tasks/taskRepo");
const { createTaskService } = require("./tasks/taskService");
//luodaan taskRepo ja taskService ilmentymät
const taskRepo = createTaskRepo();
const taskService = createTaskService({ taskRepo });

//import Express
const express=require("express");
//luo express-ilmentymän
const app=express();
//import validointi funktio taskService.js:sta
const {validateTask}=require("./tasks/taskService");

//middleware parses json requests
app.use(express.json());

//Checkpoint, verifioidaan että app toimii
app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});
//POST /tasks luo uuden tehtävän
app.post("/tasks", async (req, res, next) => {
  try {
    const created = await taskService.createTask(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});
//GET /tasks palauttaa kaikki tehtävät
app.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await taskService.listTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
//error handling middleware
app.use((err,req,res,next)=>{
    void next;
    if(err.name==="ValidationError"){
         return res.status(400).json({error:err.message});
    }
    if (err.name === "NotFoundError") {
    return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({error:"Internal Server Error"}); 
});

module.exports=app;