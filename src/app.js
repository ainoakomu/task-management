//import Express
const express=require("express");
//luo express-ilmentymän
const app=express();

//middleware parses json requests
app.use(express.json());

//Checkpoint, verifioidaan että app toimii
app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});

module.exports=app;