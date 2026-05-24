const crypto = require("crypto");
const createRazorpayInstance = require("../config/rajorpay.config");
const paymentModel = require("../models/payment.model");

const Razorpay=createRazorpayInstance;

const makePayment = async (req, res) => {
  try {
    const { userId, captainId, fare, carType } = req.body;
    const options = {amount: fare * 100, currency: "INR",receipt: `receipt_${Date.now()}`,};
    const order = await Razorpay.orders.create(options);
    await paymentModel.create({userId,captainId,orderId: order.id});
    res.status(200).json({success: true,data:order});
    } catch (err) {

    res.status(500).json({success: false,message: err.message});
  }
};


const verifyPayment=async(req,res)=>
{
    const {order_id,payment_id,signature}=req.body;
    const secret=process.env.Rajorpay_KEY_SECRET;
    const hmac=crypto.createHmac("sha256",secret);
    hmac.update(order_id + '|' + payment_id);
    const generateSignature=hmac.digest('hex');
    if(generateSignature==signature)
        res.status(200).json({success:"true",message:"order created successfully"});
}

module.exports = { makePayment,verifyPayment };