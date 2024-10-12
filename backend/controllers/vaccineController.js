const Vaccine = require("../models/vaccineModel");
const Subscriber = require("../models/subscriberModel");
const Doctor = require("../models/doctorModel");

exports.vaccination = async (req, res) => {
    try {
        const doctorId = req.params.doctorId; // Extracting doctorId from the request params
        const { patient, vaccineName } = req.body; // Destructuring patient and vaccineName from req.body
        

        // Validation: Checking if the necessary data is provided
        if (!doctorId || !patient || !vaccineName) {
            return res.status(400).json({ error: "Doctor ID, patient ID, and vaccine name are required" });
        }

        // Fetching doctor's details
        const doctorDetails = await Doctor.findById(doctorId);
        if (!doctorDetails) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        // Creating a new vaccine record
        const vaccine = new Vaccine({
            patient,
            doctor: doctorDetails._id,
            vaccineName
        });

        // Saving the vaccine record
        const savedVaccine = await vaccine.save();

        // Updating the patient's vaccines array with the new vaccine
        const updatedPatient = await Subscriber.findByIdAndUpdate(
            patient, 
            { $push: { vaccines: savedVaccine._id } }, 
            { new: true }
        )
        .populate("vaccines") // Populating the vaccines field with actual vaccine data
        .exec();

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Responding with the updated patient details
        res.json({
            message: "Vaccine dose updated successfully",
            patient: updatedPatient,
        });
    } catch (err) {
        console.error("Error while updating vaccine dose: ", err);
        return res.status(500).json({
            error: "Error while updating vaccine dose",
        });
    }
};
