const mongoose=require("mongoose");
function connectToDb()
{
    // mongoose.connect("mongodb://127.0.0.1:27017/uber").
        mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB Connected Successfully");
        })
        .catch((err) => {
            console.log(err);
        });
}
module.exports=connectToDb;