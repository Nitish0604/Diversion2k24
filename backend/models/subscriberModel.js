const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    guardianName: {
        type: String,
        // required: true,
        // trim: true,
    },
    childName: {
        type: String,
        // required: true,
        // trim: true,
    },
    dob: {
        type: String,
        // required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        // trim: true,
    },
    contact: {
        type: Number,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
        // trim: true,
    },
    dist: {
        type: String,
        // required: true,
        // trim: true,
    },
    state: {
        type: String,
        // required: true,
        // trim: true,
    },
    pin: {
        type: Number,
        // required: true,
    },
    vaccines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
    }],
    packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
    }],
    assignedDoctor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    }],
    live :{
        type: String,
        default : "offline"
    }
});

module.exports = mongoose.model("Subscriber",subscriberSchema);