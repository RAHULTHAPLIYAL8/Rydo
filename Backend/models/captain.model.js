const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Firstname must be more than 3 characters"]
        },
        lastname:
        {
           type:String,
           required:true,
           minlength:[3,"Lastname must be more than 3 characters"]
        }
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[5,"Email must be more than 5 characters"]
    },
    password:
    {
        type:String,
        required:true,
        select:false 
    },
    socketId:
    {
        type:String,
    },
    status:
    {
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:
    {
        color:{
            type:String,
            required:true,
            minlength:[3,"Must be more than 3 characters"]
        },
        plate:
        {
            type:String,
            required:true,
            minlength:[3,"must be more than 3 characters"]
        },
        capacity:
        {
            type:String,
            required:true,
            minlength:[1,"Capacity is more then 0"]
        },
        vehicleType:
        {
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        },      
    },
     location:
        {
            ltd:{
                type:Number,
            },
            lng:
            {
                type:Number
            }
        }
})

captainSchema.methods.generateAuthToken=function()
{
    const token=jwt.sign({_id:this._id},"rahul123",{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword=async function(password)
{
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function(password) {    // Know in google that what mean by static methods
    return await bcrypt.hash(password,10);
}

const captainModel=mongoose.model('captain',captainSchema);

module.exports=captainModel;