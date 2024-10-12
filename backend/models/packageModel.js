const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema ({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Subscriber",
    },
    orderId: {
        type: String,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    packageDuration: {
        type: String,
        required: true,
    },
    packageAmount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: "Pending",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Package",packageSchema);