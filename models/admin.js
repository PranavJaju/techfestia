const mongoose = require("mongoose")
const adminS = mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
    

})

const admin = mongoose.model("admin",adminS);
module.exports = admin;
