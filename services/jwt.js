const jwt=require('jsonwebtoken');
const keys=require('../config/keys');

exports.generateToken=(user)=>{
    const {username,email,_id}=user;
    return jwt.sign({username,email,_id},keys.jwtSecretToken,{expiresIn:'24h'});
}

exports.verifyToken=(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        var token = req.headers.authorization.split(' ')[1];
        req.decodedToken={};
        jwt.verify(token,keys.jwtSecretToken,(error,tokenData)=>{
            if(error && error.name=='TokenExpiredError'){
                return res.json({ status: false, message: error.name });
            }
            if(error){
                return res.status(400).json({status:false,message:'Unauthorized Request'});
            }
            if(tokenData)
            req.decodedToken=tokenData;

            next();
        });
    }
    else
    req.json({status:false,message:'No Token Found'})
}