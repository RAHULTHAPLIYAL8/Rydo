const mongoose=require("mongoose");
function connectToDb()
{
    mongoose.connect("mongodb://127.0.0.1:27017/uber").
    then(console.log("Mongod Db Connected Successfully")).catch((err)=>{console.log(err)})
}
module.exports=connectToDb;