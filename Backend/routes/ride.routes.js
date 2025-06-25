const express=require('express');
const router=express.Router();
const {body,query}=require('express-validator');
const rideController=require("../controllers/ride.controller")
const authMiddleware=require("../middlewares/auth.middleware")

router.post('/create',
    authMiddleware.authUser,
    // body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid user id'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Adrress'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination Adrress'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Car'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid Destination'),
    rideController.getFare,
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage("Invalid RideId"),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
)

module.exports=router;