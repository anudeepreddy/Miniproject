const argon2=require('argon2');
const user=require('../../models/user');
const {generateToken}=require('../jwt');

exports.login=async(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body);

    try{
        const userRecord=await user.findOne({username:username.toLowerCase()});
        if(!userRecord)
            return res.status(200).send({status:false,message:'Username Not Found'});

        const correctPassword= await argon2.verify(userRecord.password,password);
        if(!correctPassword)
            return res.status(200).send({status:false,message:'Invalid Credentials'});
        
        res.status(200).send({
            status:true,
            accessToken:generateToken(userRecord)
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({status:false,message:'Internal Server Error'});
    }
}