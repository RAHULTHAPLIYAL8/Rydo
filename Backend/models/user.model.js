const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    fullname:{
    firstname:{
        type:String,
        required:true,
        minlegth:[5,"First Name should be at least 5 characters"]
    },
    lastname:{
        type:String,
        minlegth:[5,"Last Name should be at least 5 characters"]
    }
   },
    email:{
        type:String,
        required:true,
        minlegth:[5,"Email Name should be at least 5 charactees"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    }
})
userSchema.methods.generateAuthToken=function()
{
    const token=jwt.sign({_id:this._id},"rahul123",{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword=async function(password)
{
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password) {    // Know in google that what mean by static methods
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema)
module.exports=userModel;