const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const student = require("./model");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
app.get("/",async(req,res)=>{
    res.send("ping");
})

app.post("/form",async(req,res)=>{
try{
    const {team_name,problem_id,college,students} = req.body;
    console.log(team_name);
    const Nsave = new student({team_name,problem_id,college,students});
   
    const team = await Nsave.save();
    
    res.status(201).json({team,message:"Form Submitted Successfully"});
}catch(err){
    res.status(500).json({err});
}
})
app.listen(8080,()=>{
    console.log("server running");
})