
const rideModal=require('../models/ride.model');
const mapService=require('../services/maps.service')
const crypto = require("crypto");
const { sendMessageToSocketId } = require('../socket');


async function getFare(pickup,destination)
{
    if(!pickup && !destination)
    {
        throw new Error('Pickup and destination are Required');
    }

    const distanceTime=await mapService.getDistanceTime(pickup,destination);

    const baseFare={auto:30,car:50,motorcycle:20}
    const perKmRate={auto:10,car:15,motorcycle:8}
    const perMinuteRate={auto:10,car:3,motorcycle:1.5}

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };

    return fare;
}

module.exports.getFare=getFare;


function getOTP(num) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num);

    return crypto.randomInt(min, max).toString();
}


module.exports.createRide=async({user,pickup,destination,vehicleType})=>
{

    if(!user || !pickup || !destination || !vehicleType)
    {
        throw new Error('All Field are Required');
    }

    const fare=await getFare(pickup,destination);

    const ride=rideModal.create(
        {
            user,
            pickup,
            destination,
            otp:getOTP(6),
            fare:fare[vehicleType]
        }
    )

    return ride;
  
}


module.exports.confirmRide=async({rideId,captain})=>
{
    if(!rideId)
    {
        throw new Error('Ride id is Required');
    }

    await rideModal.findOneAndUpdate({_id:rideId},
        {
            status:'accepted',
            captain:captain._id,
        }
    )
    const ride=await rideModal.findOne(
        {
           _id:rideId
        }
    ).populate('user').populate('captain').select('+otp');

    if(!ride)
    {
      throw new Error("Ride not found")
    }
    return ride;
}


module.exports.startRide= async ({rideId,otp,captain})=>
{
   if(!rideId ||!otp)
    {
        throw new Error('Ride id and OTP are requird');
    }

    const ride=await rideModal.findOne(
        {
        _id:rideId
        }
    ).populate('user').populate('captain').select('+otp');

    if(!ride)
    {
        throw new Error('Ride not found')
    }

    if(ride.status !== 'accepted')
    {
        throw new Error('Ride not accepted')
    }

    if(ride.otp!==otp)
    {
        throw new Error('Invalid OTP')
    }

    await rideModal.findOneAndUpdate(
        {
            _id:rideId
        },
        {
            status:'ongoing'
        }
    )

    sendMessageToSocketId(ride.user.socketId,
        {
            event:'ride-started',
            data:ride
        }
    )

    return ride;
}


module.exports.endRide=async({rideId,captain})=>
{

    if(!rideId)
    {
        throw new Error('Ride id is required');    
    }

    const ride=await rideModal.findOne(
        {
            _id:rideId,
            captain:captain._id
        }
    ).populate('user').populate('captain').select('+otp');

    console.log("End-ride")
    console.log(ride)

    if(!ride)
    {
        throw new Error('Ride not found')
    }

    if(ride.status !== 'ongoing')
    {
       throw new Error('Ride not ongoing')
    }

    await rideModal.findOneAndUpdate(
      {_id:rideId},
      {
        status:'completed'
      }
    )

}
