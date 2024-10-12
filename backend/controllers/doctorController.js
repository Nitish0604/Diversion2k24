const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
const mailSender = require('../util/mailSender');
const { doctorSignUpEmail } = require("../mailTemplate/doctorSignUpEmail");
const { doctorVerifiedEmail } = require("../mailTemplate/doctorVerifiedEmail");
const Subscriber = require("../models/subscriberModel");

exports.newDoctor = async (req, res) => {
    try {
        const { name, email, phoneNo, yearsOfExperience, qualification, gender, address, description } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: "Docotor Already Exists",
            });
        }


        const doctor = new Doctor({
            name, email, phoneNo, qualification, gender, yearsOfExperience, address, description

        });

        const newDoctor = await doctor.save();
        const mail = await mailSender(email, "Greetings from PlusCare", doctorSignUpEmail());

        res.status(200).json({
            success: true,
            message: "doctor info send succesfully"
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Error while sending doctor info",

        });
    }
}


exports.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const val = await Doctor.findById({ _id: id }).populate("assignedPatients").exec();

        if (!val) {
            res.status(404)
                .json({
                    seccess: false,
                    message: "Doctor not found"
                });
        }
        else {
            res.status(200)
                .json({
                    success: true,
                    data: val,
                    message: "Doctor data fetched by id"
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


exports.getAllDoctor = async (req, res) => {
    try {

        const Doctors = await Doctor.find().populate("assignedPatients").exec();

        res.json({
            Doctors,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Error while fecthing post",

        });
    }
}


exports.delDocById = async (req, res) => {
    try {
        const { id } = req.params;
        await Doctor.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Doctor data remove successfully"
        });
    }
    catch (err) {
        console.error(err),
            res.status(500)
                .json({
                    success: false,
                    data: "internal server error",
                    message: err.message,
                })
    }
}


exports.doctorVerifiedMail = async (req, res) => {
    try {
        const id = req.params.id;
        const doctorDetails = await Doctor.findById(id);
        if (!doctorDetails) {
            res.status(404)
                .json({
                    seccess: false,
                    message: "Doctor not found"
                });
        }
        console.log(doctorDetails);
        doctorDetails.isApproved = true;
        doctorDetails.save();
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(otp)

        let hashPassword = otp; // Default to OTP
        try {
            hashPassword = await bcrypt.hash(otp, 10);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Hashing password encountered an issue",
            });
        }

        const UpdateDoctor = await Doctor.findByIdAndUpdate(id, { password: hashPassword }, { new: true });

        const mail = await mailSender(doctorDetails.email,
            "Greetings from PlusCare",
            doctorVerifiedEmail(doctorDetails.email, otp));

        res.json({
            success: true,
            message: "Doctor verified successfully"
        });
    }
    catch (err) {
        console.error(err),
            res.status(500)
                .json({
                    success: false,
                    data: "internal server error",
                    message: err.message,
                });
    }
}

exports.makelivedoctor = async (req, res) => {
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

        // If the subscriber is already live with this doctor, set both to offline
        if (subscriber.live === doctorID) {
            doctor.live = "offline";
            await doctor.save();
            subscriber.live = "offline";
            await subscriber.save();

            return res.status(200).json({
                success: true,
                message: "You are offline"
            });
        }

        // If the subscriber is available (offline), set both to live
        if (subscriber.live === "offline") {
            subscriber.live = doctorID;
            await subscriber.save();

            doctor.live = id;
            await doctor.save();

        }


        else {
            return res.status(400).json({
                success: false,
                message: "You are going to meet with doctor"
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: "Subscriber and Doctor live"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Error while fetching data"
        });
    }
};

