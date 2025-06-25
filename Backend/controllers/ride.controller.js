const rideService=require('../services/ride.service');
const {validationResult}=require("express-validator");
const mapService=require("../services/maps.service");
const {sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide=async(req,res,next)=>
{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   }
   
   const {pickup,destination,vehicleType}=req.body;

   const pickupCoordinates=await mapService.getAddressCoordinate(pickup);
   console.log(pickupCoordinates);
    const captainInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.latitude, pickupCoordinates.longitude, 6);
   // 
   console.log("Print The Available Captain")
   console.log(captainInRadius);
   
   try {
      const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType}) 
      ride.otp='';
      res.status(201).json(ride);
      console.log(ride);
      const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user');
      captainInRadius.map(async (captain) => {
      console.log("Run Socket");
      sendMessageToSocketId(captain.socketId, {event:'new-ride', data: rideWithUser });
    });

      

   } catch (error) {
      return res.status(500).json({message:error.message});
   }
   

}
//Get Fare Controller
module.exports.getFare=async(req,res,next)=>
{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   }

   const {pickup,destination}=req.query;

   try{
      const fare=await rideService.getFare(pickup,destination);
      return res.status(200).json(fare);
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }

}

module.exports.confirmRide=async(req,res,next)=>
{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   }
   const {rideId}=req.body;

   try {
      const ride=await rideService.confirmRide({rideId, captain:req.captain});

      //Socket for sending the data in user 
      sendMessageToSocketId(ride.user.socketId,{event:'ride-confirmed',data:ride})
      console.log(ride);
      return res.status(200).json(ride)
   } catch (error) {
      return res.status(500).json({message:error.message});
   }
}

module.exports.startRide=async(req,res,next)=>
{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   }

   const {rideId,otp}=req.query;

   try {

       const ride=await rideService.startRide({rideId,otp,captain:req.cap})

      sendMessageToSocketId(ride.user.socketId,{
         event:'ride-started',
         data:ride
         })

         return res.status(200).json(ride);
      
   } catch (error) {
      
      return res.status(500).json({message:error.message})
   }
}

module.exports.endRide= async(req,res,next)=>
{
   try {   
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
    return res.status(400).json({errors:errors.array()});
   };

   const {rideId}=req.body;

   const ride=await rideService.endRide({rideId,captain:req.captain});

   if (ride && ride.user && ride.user.socketId) {
   sendMessageToSocketId(ride.user.socketId,
      {
         event:'ride-ended',
         data:ride
      }
   )
   }

   return res.status(200).json(ride);

   } catch (error) {
      
    return res.status(500).json({message:error.message})
   }
}
