const userModel=require("../models/user.model");
const captainModel=require("../models/captain.model")
const blackListTokenModel=require("../models/blacklistToken.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports.authUser=async(req,res,next)=>
{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
    return res.status(401).json({message:"Unauthorised hogya"});
    }
    const isBlackListed=await blackListTokenModel.findOne({token:token});
    if(isBlackListed)
    {
     return res.status(401).json({message:"Unauthorised because logout"});
    }
    try {
        const decoded=jwt.verify(token,'rahul123');
        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorised"});
    }
}

module.exports.authCaptain=async(req,res,next)=>
{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({message:"Unauthorised"});
    }
    const isBlackListed=await blackListTokenModel.findOne({token:token});
    if(isBlackListed)
    {
        return res.status(401).json({message:"Unauthorised Because logout"});
    }
    try
    {
        const decoded=jwt.verify(token,'rahul123');
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain;
        return next();
    }catch(error)
    {
        return res.status(401).json({message:"Unauthrorised"});
    }
}