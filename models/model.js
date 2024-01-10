const mongoose = require("mongoose");
const validator = require("validator");
const Smodel = mongoose.Schema({
    team_name:{
        type:String
    },
    problem_id:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    place:{
        type:String
    },
    leader_name:{
            type:String,
            required:true
        },
     
        email:{
            type:String,
            required:true,
            unique:[true,"Email already exists"],
            validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid E-mail id");
            }
            } 
        },
        mobile:{
            type:Number,
            min:1000000000,
            max:9999999999,
            required:true,
            unique:[true,"Number already exist"]
    
        },
        utr:{
            type:String,
            required:true
        }

})

const student = mongoose.model("team",Smodel);

module.exports = student;