const mongoose=require("mongoose");
function connectToDb()
{
    mongoose.connect(`${process.env.MONGO_URL}`).
    then(console.log("Mongod Db Connected Successfully")).catch((err)=>{console.log(err)})
}
module.exports=connectToDb;