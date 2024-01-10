const jwt = require('jsonwebtoken');
const Auth = async(req,res,next)=>{
    let token = req.headers['authorization']
    
    if (!token) {
        
        return res.status(401).json({ message: 'Unauthorized' });
        
      }
      token = token.replace("Bearer ","");  
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{ 
        if(err){
        return res.status(403).json({ message: 'Forbidden' });
    }
    else{
        next();
    }});
       
}

module.exports = Auth;