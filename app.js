const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const student = require("./models/model");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const adminR = require("./routes/admin")
const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
app.use("/",adminR);
app.get("/",async(req,res)=>{
    res.send("ping");
})

app.post("/form",async(req,res)=>{
try{
    const {team_name,problem_id,college,leader_name,email,mobile,place,utr} = req.body;
    // console.log(req.body);
    const result = await student.findOne({$or:[{email:email},{mobile:mobile}]})
    if (result) {
        console.log(result);
        return res.status(401).json({ message: "Some Email/Mobile already registered with us" });
    }
    const Nsave = new student({team_name,problem_id,college,place,utr,email,mobile,leader_name});
   
    const team = await Nsave.save();
    
    res.status(201).json({team,message:"Form Submitted Successfully"});
}catch(err){
    res.status(500).json({err});
    console.log(err)
}
})
app.listen(8080,()=>{
    console.log("server running");
})