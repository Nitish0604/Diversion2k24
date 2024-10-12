const express = require("express");
const router = express.Router();

const { auth } = require("../middleWare/auth");
const { newSubscriber, getSubscriberById, getAllSubscriber, makelivesubscriber } = require("../controllers/subscriberController");
const { userLogIn, doctorLogIn } = require("../controllers/loginController");
const { vaccination } = require("../controllers/vaccineController");
const { newDoctor, getDoctorById, getAllDoctor, delDocById, doctorVerifiedMail, makelivedoctor } = require("../controllers/doctorController");
const { newPackage, getPackageById, getAllPackage , getPackageByuserId} = require("../controllers/packageController");
const { orderCreate, paymentVerify } = require("../controllers/payment");
const { assignDoctorPatient } = require("../controllers/assignController");


router.post("/newSubscriber", newSubscriber);
router.post("/userLogin", userLogIn);
router.post("/doctorLogin", doctorLogIn);
router.post("/updateDose/:doctorId",  vaccination);
router.post("/newDoctor", newDoctor);
router.post("/newPackage", auth, newPackage);
router.get("/allSubscriber", getAllSubscriber);
router.get("/allDoctors", getAllDoctor);
router.get("/allPackages", getAllPackage);
router.post("/orderCreate", orderCreate);
router.post("/payment/paymentverify", paymentVerify);
router.get("/doctorById/:id", getDoctorById);
router.get("/subscriberById/:id", getSubscriberById);
router.get("/packageById/:id", getPackageById);
router.get("/getPackageByuserId/:id", getPackageByuserId);
router.delete("/delDocById/:id", delDocById);
router.post("/doctorVerified/:id", doctorVerifiedMail);
router.post("/assignDoctorPatient", assignDoctorPatient);
router.post("/makelivesubscriber/:id/:doctorID", makelivesubscriber);
router.post("/makelivedoctor/:id/:doctorID", makelivedoctor);



module.exports = router;