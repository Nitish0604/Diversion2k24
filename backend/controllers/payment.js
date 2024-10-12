const Subscriber = require("../models/subscriberModel");
const Package = require("../models/packageModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay with your credentials from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const orderCreate = async (req, res) => {
  try {
    const { amount, currency, receipt, id, selectedPackage } = req.body;
    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: receipt,
    };




    const order = await razorpay.orders.create(options);
    res.json(order);
    console.log(order);

    const newPackage = new Package({
      buyerId: id,
      packageName: selectedPackage.packageName,
      packageDuration: selectedPackage.packageDuration,
      packageAmount: selectedPackage.packageAmount,
      description: selectedPackage.description,
      orderId: order.id,
    });
    await newPackage.save();

    const subscriber = await Subscriber.findById(id);
    subscriber.packages.push(newPackage._id);
    await subscriber.save();

  } catch (error) {
    console.log(error);
  }
};

const paymentVerify = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    // console.log(razorpay_payment_id + " " + razorpay_order_id + " " + razorpay_signature);

    // const secret_key = '1234567'; // Replace with your actual secret key
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSign === razorpay_signature;
    if (isValid) {
      console.log('request is legit');
      await Package.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { $set: { paymentStatus: "confirm", updatedAt: Date.now() } },
      );
      return res.status(200).json({
        success: true, message: "Payment verified successfully"
      });
    } else {
      console.log('request is not legit');
    }

  } catch (error) {
    console.log('Error during payment verification:', error);
    res.status(500).json({
      success: false, message: "An error occurred during payment verification",
      error: error.message
    });
  }
};



module.exports = { orderCreate, paymentVerify };
