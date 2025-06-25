const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectToDb=require("./db/db")
const app = express();
const cookieParser=require('cookie-parser');
const userRoutes=require("./routes/user.routes")
const captainRoutes=require("./routes/captain.routes")
const mapsRoutes=require("./routes/maps.routes")
const rideRoutes=require("./routes/ride.routes");

//Mongodb function
connectToDb();
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); //for parsing cookies from frontend to backend

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/users',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

// Export app
module.exports = app;
