const jwt = require('jsonwebtoken');
const Auth = async(req,res,next)=>{
    const token = req.headers('authorization').replace("Bearer ","");
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{ 
        if(err){
        return res.status(403).json({ message: 'Forbidden' });
    }
    else{
        next();
    }});
       
}

module.exports = Auth;