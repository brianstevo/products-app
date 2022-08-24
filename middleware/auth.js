const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET)
        req.userData={email:decodedToken.email,userId:decodedToken.userId,userRole:decodedToken.role}
        next()
    }
    catch(err){
        res.status(401).json({error:"authorization failed"})
    }
}