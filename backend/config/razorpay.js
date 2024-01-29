const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id : Process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});