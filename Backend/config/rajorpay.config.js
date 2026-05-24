const Razorpay = require("razorpay");

const createRazorpayInstance = new Razorpay({
  key_id: process.env.RAJORPAY_KEY_ID,
  key_secret: process.env.RAJORPAY__KEY_SECRET,
});

module.exports = createRazorpayInstance;