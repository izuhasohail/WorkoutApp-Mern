const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const requireAuth=async(req,res,next)=>{
    //verify authentication
    const {authorization}=req.headers;

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }
    // 'Bearer hcdzncdcpwurhce.oedewpnwjbe.bzywvuegodiwe'
    const token=authorization.split(' ')[1];
    //[0]='Bearer'  [1]=zhvuwshyx.bqjxdevewcew.ewjhbiuwopeo

    try{
        const {_id}=jwt.verify(token, process.env.SECRET);

        req.user=await User.findOne({_id}).select('_id');
        /*
        intead of the entire documnet, only the _id will be retrieved 
        */
       next();

    }
    catch(error){

        console.log(error);
        res.status(401).json({error:'Request is not authorized'})

    }


}

module.exports=requireAuth