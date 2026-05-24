const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post( "/create",authMiddleware.authUser,paymentController.makePayment);
router.post("/verify",authMiddleware.authUser,paymentController.verifyPayment);

module.exports = router;