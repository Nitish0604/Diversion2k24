import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VaccineModal from '../Component/VaccineModal'; // Import the Modal component
import { baseurl } from '../index';

const PatientDetails = () => {
    // const patient = location.state || {};
    const id = useParams()?.id;
    console.log(id)
    const [patient, setPatient] = useState(null);

    console.log(patient);
    const [isModalOpen, setModalOpen] = useState(false);
    const [vaccineName, setVaccineName] = useState('');

    const [vaccines, setVaccines] = useState([]);
    const doctorId = patient?.assignedDoctor[patient?.assignedDoctor.length - 1] || {};
    console.log(doctorId);

    // Available vaccines with details
    const availableVaccines = [
        {
            "Vaccine": "BCG",
            "Age": "At birth or as early as possible till one year of age",
            "Dose": "0.1 ml (0.05ml until 1 month)",
            "Route": "Intra-dermal",
            "Site": "Left Upper Arm"
        },
        {
            "Vaccine": "Hepatitis B-birth dose",
            "Age": "At birth or as early as possible within 24 hours",
            "Dose": "0.5 ml",
            "Route": "Intra-muscular",
            "Site": "Antero-lateral side of mid-thigh"
        },
        {
            "Vaccine": "OPV-0",
            "Age": "At birth or as early as possible within the first 15 days",
            "Dose": "2 drops",
            "Route": "Oral",
            "Site": "Oral"
        },
        {
            "Vaccine": "OPV 1,2 and 3",
            "Age": "At 6 weeks, 10 weeks, and 14 weeks",
            "Dose": "2 drops",
            "Route": "Oral",
            "Site": "Oral"
        },
        {
            "Vaccine": "DPT 1,2 and 3",
            "Age": "At 6 weeks, 10 weeks, and 14 weeks",
            "Dose": "2 drops",
            "Route": "Intra-Muscular",
            "Site": "Antero-lateral side of mid-thigh"
        },
        {
            "Vaccine": "Hepatitis B Pentavalent",
            "Age": "Hepatitis B can be completed months – 12 months",
            "Dose": "0.5ml",
            "Route": "Intra-Muscular",
            "Site": "Antero-lateral side of mid-thigh"
        },
        {
            "Vaccine": "DPT Booster-2",
            "Age": "At 5-6 years of age",
            "Dose": "0.5 ml",
            "Route": "Intra-muscular",
            "Site": "Upper arm"
        },
        {
            "Vaccine": "TT",
            "Age": "At 10-16 years of age",
            "Dose": "0.5 ml",
            "Route": "Intra-muscular",
            "Site": "Upper arm"
        },
    ];

    const fetchSubscriber = async (id) => {
        try {
            const response = await axios.get(`${baseurl}/Home/subscriberById/${id}`);

            // Axios automatically checks for response.ok
            const data = response.data.data;
            setPatient(data);
            console.log('Fetched Subscriber:', data);
            const vaccines = data.vaccines.map(element => element.vaccineName);
            console.log(vaccines); // Log the array of vaccine names
            setVaccines(vaccines);

        } catch (error) {
            console.error('Error fetching subscriber:', error);
        }
    }

    const updateVaccineDose = async () => {
        try {
            const response = await axios.post(
                `${baseurl}/Home/updateDose/${doctorId}`, // Passing doctorId as part of the URL
                {
                    patient: patient?._id,
                    vaccineName: vaccineName,
                }
            );

            console.log(doctorId + " " + patient?._id + " " + vaccineName);

            console.log("Vaccine Dose Updated: ", response);

        } catch (error) {
            console.error("Error updating vaccine dose:", error.response?.data || error.message);

        }
    };




    console.log(vaccines);
    const handleAddVaccine = () => {
        const newVaccine = { _id: Date.now(), vaccineName }; // Generating a unique ID for simplicity
        setVaccines((prevVaccines) => [...prevVaccines, newVaccine]);
        console.log('Adding vaccine:', vaccineName);
        updateVaccineDose();
        setModalOpen(false); // Close modal after adding
    };

    const handleCopyToClipboard = (vaccine) => {
        // Assuming 'givenVaccines' is an array of vaccine names that have already been given
        if (vaccines.includes(vaccine)) {
            alert(`${vaccine} has already been administered!`);
        } else {
            navigator.clipboard.writeText(vaccine);
            alert(`${vaccine} copied to clipboard!`);
        }
    };


    // Function to get details of the vaccine based on name
    const getVaccineDetails = (vaccineName) => {
        const vaccine = availableVaccines.find(v => v.Vaccine === vaccineName);
        console.log(vaccine);
        return vaccine || {};
    };

    useEffect(() => {
        fetchSubscriber(id);
    }, [id]);

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg transition-all duration-500 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-darkGreen mb-6 border-b-2 pb-2">Patient Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display patient information */}
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Guardian Name:</h3>
                    <p className="text-gray-700">{patient?.guardianName}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Child Name:</h3>
                    <p className="text-gray-700">{patient?.childName}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Date of Birth:</h3>
                    <p className="text-gray-700">{patient?.dob}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Gender:</h3>
                    <p className="text-gray-700">{patient?.gender}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Email:</h3>
                    <p className="text-gray-700">{patient?.email}</p>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-darkGreen">Contact:</h3>
                    <p className="text-gray-700">{patient?.contact}</p>
                </div>
            </div>

            <h3 className="mt-8 text-2xl font-semibold text-darkGreen">Vaccines Received:</h3>
            <div className="mt-4 bg-gray-100 rounded-lg p-6">
                {vaccines.length > 0 ? (
                    <ul className="list-decimal">
                        {vaccines.map((vaccine,index) => {
                            const details = getVaccineDetails(vaccine);
                            return (
                                <li key={index} className=" text-gray-700 mb-4 bg-gray-100 p-4 rounded-lg shadow-sm transition-all">
                                    {/* Vaccine Link */}
                                    <Link to={`/vaccine/${vaccine._id}`} className="block text-blue-600 hover:text-blue-800 font-semibold text-lg mb-2 transition-all">
                                        {details.Vaccine}
                                    </Link>

                                    {/* Column Headers */}
                                    <div className="grid grid-cols-4 gap-4 font-semibold text-gray-800 text-[1.1rem]">
                                        <p>Age</p>
                                        <p>Dose</p>
                                        <p>Route</p>
                                        <p>Site</p>
                                    </div>

                                    {/* Vaccine Details in Same Row */}
                                    <div className="grid grid-cols-4 gap-4 text-gray-600 text-[1.1rem] mt-2">
                                        <p>{details.Age}</p>
                                        <p>{details.Dose}</p>
                                        <p>{details.Route}</p>
                                        <p>{details.Site}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-600">No vaccines received.</p>
                )}
            </div>

            <h3 className="mt-8 text-2xl font-semibold text-darkGreen">Available Vaccines:</h3>
            <div className='p-4 mt-4 border-2 rounded-md'>
                <table className="border-collapse rounded-md w-full">
                    <thead className=''>
                        <tr className='text-gray-600 font-mono'>
                            <th className="p-[1rem]">Serial No:</th>
                            <th className="p-[1rem]">Vaccine</th>
                            <th className="p-[1rem]">Age</th>
                            <th className="p-[1rem]">Dose</th>
                            <th className="p-[1rem]">Site</th>
                        </tr>
                    </thead>

                    <tbody className='bg-lightBlue '>
                        {availableVaccines.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center p-[1rem]">{index + 1}</td>
                                <td className="text-center capitalize p-[1rem]">
                                    {item.Vaccine}
                                </td>
                                <td className="p-[1rem] capitalize">{item.Age}</td>
                                <td className="text-center capitalize p-[1rem]">{item.Dose}</td>
                                <td className="p-[1rem]">{item.Site}</td>
                                <td className="p-[1rem]">
                                    <button
                                        onClick={() => handleCopyToClipboard(item.Vaccine)}
                                        className=" px-3 py-1 bg-darkGreen text-white rounded-md hover:bg-blue-600 transition-all duration-200"
                                    >
                                        Copy
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center px-6 py-3 bg-darkGreen text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                    Add Vaccine Details
                </button>
            </div>

            <VaccineModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddVaccine}
                vaccineName={vaccineName}
                setVaccineName={setVaccineName}
            />
        </div>
    );
};

export default PatientDetails;
