const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware=require("../middlewares/auth.middleware");

router.post("/register", [
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be more than 0'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
], captainController.registerCaptain);


router.post("/login",[body('email').isEmail().withMessage("Invalid email"),
  body('password').isLength({min:5}).withMessage("Paswwrod must be at least 5 characters"),
],captainController.loginCaptain),
module.exports = router;

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptain);
