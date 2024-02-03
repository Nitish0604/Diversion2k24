const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    yearsOfExperience: {
        type: String,
        //required: true,
    },
    qualification: {
        type: String,
        //required: true,
    },
    yearsOfExperience: {
        type: String,
        //required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
    },
    phoneNo: {
        type: Number,
        //required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },

});

module.exports = mongoose.model("Doctor",doctorSchema);
