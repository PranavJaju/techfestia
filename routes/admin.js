const express = require("express")
const router = express.Router();
const admin = require("../models/admin")
const student = require("../models/model")
const jwt = require('jsonwebtoken');
const Auth = require("../middleware/middleware")
router.post("/admin",async(req,res)=>{
    try{
        const {username,password} = req.body;
        const r = await admin.findOne({username});
        if(!r){
            return res.status(400).json({message:"Wrong Credentials"});
        }
        else{
            if(password===r.password){
                const token = jwt.sign({id:r.username},process.env.SECRET_KEY);
                return res.status(201).json({message:"Login Successful",access:token});
            }
        }
    }
    catch(err){
        console.log("error: "+err);
    }
})

router.get("/admin/fetch",Auth,async(req,res)=>{
    try{
        const result = await student.find();
        return res.status(201).json(result);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;