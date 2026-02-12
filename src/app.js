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

//GET /tasks palauttaa tyhjän taulukon
app.get("/tasks",(req,res)=>{
    res.json([]);
});
//Checkpoint, verifioidaan että app toimii
app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});

app.post("/tasks",(req,res,next)=>{
    try{
        validateTask(req.body);
        res.status(201).json(req.body);
    }catch(error){
        next(error);
    }
});

//error handling middleware
app.use((err,req,res,next)=>{
    void next;
    if(err.name==="ValidationError"){
         return res.status(400).json({error:err.message});
    }
    return res.status(500).json({error:"Internal Server Error"});
    
});

module.exports=app;