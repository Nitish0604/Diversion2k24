const Package = require("../models/packageModel");
const Subscriber = require("../models/subscriberModel");

exports.newPackage = async (req, res) => {
    try {
        const { packageName, packageDuration, packageAmount, description } = req.body;


        const package = new Package({
            packageName, packageDuration, packageAmount, description
        });

        const newPackage = await package.save();

        res.status(200).json({
            success: true,
            message: "Package Created succesfully"
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Error while creating package",

        });
    }
}


exports.getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const val = await Package.findById(id);

        if (!val) {
            res.status(404)
                .json({
                    seccess: false,
                    message: "Package not found"
                });
        }
        else {
            res.status(200)
                .json({
                    val,
                    success: true,
                    message: "Package data fetched by id"
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
exports.getPackageByuserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Subscriber.findById(id);
        if (!user) {
            res.status(404)
                .json({
                    seccess: false,
                    message: "User not found"
                });
        }
        else {
            const packages = await Package.find({ _id: { $in: user.packages } });
            res.status(200)
                .json({
                    packages,
                    success: true,
                    message: "Package data fetched by id"
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


exports.getAllPackage = async (req, res) => {
    try {

        const Packages = await Package.find();

        res.json({
            Packages,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Error while fecthing packages",

        });
    }
}

