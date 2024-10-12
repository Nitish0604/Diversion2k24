const Subscriber = require("../models/subscriberModel");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
const mailSender = require('../util/mailSender');
const { subscriptionEmail } = require("../mailTemplate/subscriptionEmail");
const Vaccine = require("../models/vaccineModel");
const Doctor = require("../models/doctorModel");


const newSubscriber = async (req, res) => {
    try {
        const { guardianName, childName, dob, gender, email, contact, address, dist, state, pin } = req.body;

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: "Subscriber Already Exists",
            });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(otp)

        let hashPassword = otp; // Default to OTP
        hashPassword = await bcrypt.hash(otp, 10);

        const user = await Subscriber.create({
            guardianName: guardianName, childName, dob, gender, email, contact, address, dist, state, pin, password: hashPassword
        });

        const mail = await mailSender(email, "Greetings from PlusCare", subscriptionEmail(email, otp));

        return res.status(200).json({
            user: user,
            success: true,
            message: "User created successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User registration failed, please try again",
        });
    }
}


const getSubscriberById = async (req, res) => {
    try {
        const { id } = req.params;
        const val = await Subscriber.findById({ _id: id })
            .populate(
                {
                    path: "vaccines",
                    populate: {
                        path: "doctor",
                        select: '_id name',
                    },
                }
            ).exec();
            console.log(val);

        if (!val) {
            res.status(404)
                .json({
                    seccess: false,
                    message: "Subscriber not found"
                });
        }
        else {
            res.status(200)
                .json({
                    success: true,
                    data: val,
                    message: "Subscriber data fetched by id"
                });
        }
    }
    catch (err) {
        console.error(err),
            res.status(500).json({
                success: false,
                data: "internal server error",
                message: err.message,
            })
    }
}

const getAllSubscriber = async (req, res) => {
    try {

        const Subscribers = await Subscriber.find()
            .populate(
                {
                    path: "vaccines",
                    populate: {
                        path: "doctor",
                        select: '_id name',
                    },
                }
            ).exec();

        res.json({
            Subscribers,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Error while fecthing post",

        });
    }
}
const makelivesubscriber = async (req, res) => {
    try {
        const { id, doctorID } = req.params;

        // Find the subscriber and doctor by their respective IDs
        const subscriber = await Subscriber.findById(id);
        const doctor = await Doctor.findById(doctorID);

        // Check if subscriber exists
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found"
            });
        }

        // Check if doctor exists
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        // If the doctor is already live with this subscriber, set both to offline
        if (doctor.live === id) {
            subscriber.live = "offline";
            await subscriber.save();
            doctor.live = "offline";
            await doctor.save();
            return res.status(200).json({
                success: true,
                message: "You are offline"
            });
        }
        // If the doctor is available (offline), set both to live
        if (doctor.live === "offline") {
            subscriber.live = doctorID;
            await subscriber.save();

            doctor.live = id;
            await doctor.save();
        }


        else {
            return res.status(400).json({
                success: false,
                message: "Doctor already busy"
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: "You are going to meet with patient"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Error while fetching data"
        });
    }
};


module.exports = { getAllSubscriber, getSubscriberById, newSubscriber, makelivesubscriber };