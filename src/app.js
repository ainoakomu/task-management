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

app.post("/tasks",(req,res,next)=>{
    console.log("BODY:", req.body);
    try{
        validateTask(req.body);
        res.status(201).json(req.body);
    }catch(error){
        next(error);
    }
});

//error handling middleware
app.use((err,req,res,next)=>{
    if(err.name==="ValidationError"){
         return res.status(400).json({error:err.message});
    }
    return res.status(500).json({error:"Internal Server Error"});
    
});

module.exports=app;