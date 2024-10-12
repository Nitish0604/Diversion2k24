import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../index";

const Purchase = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"))?.data?.user;
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(user);
  const packages = [
    {
      packageName: "Infant Vaccine",
      packageDuration: "6 months",
      packageAmount: 3000,
      description: "Comprehensive vaccination package for infants to protect them from various diseases.",
      features: [
        "All essential vaccines for infants",
        "Home visits by pediatricians",
        "24/7 pediatric care support",
      ],
    },
    {
      packageName: "Elderly Care",
      packageDuration: "12 months",
      packageAmount: 12000,
      description: "Complete elderly care support with regular medical checkups and personalized attention.",
      features: [
        "Regular health checkups",
        "Emergency care services",
        "Personalized health tracking",
      ],
    },
    {
      packageName: "Prenatal Support",
      packageDuration: "9 months",
      packageAmount: 10000,
      description: "Full prenatal support with medical checkups, diet plans, and health monitoring for expectant mothers.",
      features: [
        "Monthly checkups with gynecologists",
        "Custom nutrition and exercise plans",
        "24/7 maternal care hotline",
      ],
    },
  ];

  const handlePurchaseClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const handlePayment = async (event) => {

    event.preventDefault();
    setLoading(true);

    const response = await axios.post(`${baseurl}/Home/orderCreate`, {
      amount: selectedPackage.packageAmount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
      id: user._id,
      selectedPackage: selectedPackage,
    });

    const { data } = response;
    console.log(data);

    var options = {
      "key": "rzp_test_dPJR7d6F2fDtPm", // Enter the Key ID generated from the Dashboard
      "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": data.currency,
      "name": "Plus care",
      "description": "Purchase of " + selectedPackage.packageName,
      "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${baseurl}/Home/payment/paymentverify`,
      "prefill": {
        "name": user.guardianName,
        "email": user.email,
        "contact": user.contact,
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      alert(response.error.description);
    })
    rzp1.on('payment.success', function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    });
    setLoading(false);
    closeModal();
  }



  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Purchase Packages</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">{pkg.packageName}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Duration:</strong> {pkg.packageDuration}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Amount:</strong> ₹{pkg.packageAmount}
            </p>
            <p className="text-gray-700 mb-4">{pkg.description}</p>
            <ul className="mb-4 list-disc list-inside">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <button
              className="mt-4 bg-[#006400] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => handlePurchaseClick(pkg)}
            >
              Purchase Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedPackage.packageName}</h2>
            <p className="mb-4"><strong>Duration:</strong> {selectedPackage.packageDuration}</p>
            <p className="mb-4"><strong>Amount:</strong> ₹{selectedPackage.packageAmount}</p>
            <p className="mb-4">{selectedPackage.description}</p>
            <ul className="mb-4 list-disc list-inside">
              {selectedPackage.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="mr-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#006400] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
