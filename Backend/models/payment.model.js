const mongoose=require("mongoose");

const paymentSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        captainId:
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        paymentId:
        {
            type:String,
        },
        orderId:
        {
            type:String,
            required:true
        }
    }
)

const paymentModel=mongoose.model('Payment',paymentSchema);
module.exports=paymentModel;