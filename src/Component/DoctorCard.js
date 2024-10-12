import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";


const DoctorCard = ({ doctor, index }) => {

    const [verify, setVerify] = useState(doctor?.isApproved);
    // Add this state variable
    // const [verifiedDoctors, setVerifiedDoctors] = useState([]);

    const [formData, setFormData] = useState({
        doctorId: '',
        userId: ''
    });

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const verifyHandler = async (id) => {
        try {
            // Your API endpoint URL
            console.log(id);
            const apiUrl = `http://localhost:4000/api/PlusCare/Home/doctorVerified/${id}`;

            // Your POST request using Axios
            const response = await axios.post(apiUrl);

            // Handle the response as needed
            console.log(response.data);

            // Additional actions after successful response
        } catch (error) {
            // Handle errors
            console.error('Error:', error.message);
            // Additional error handling if needed
        }


    }

    const unVerifyHandler = async (id) => {
        try {
            // Your API endpoint URL
            console.log(id);
            const apiUrl = `http://localhost:4000/api/PlusCare/Home/delDocById/${id}`;

            // Your POST request using Axios
            const response = await axios.delete(apiUrl);

            // Handle the response as needed
            console.log(response.data);

            // Additional actions after successful response
        } catch (error) {
            // Handle errors
            console.error('Error:', error.message);
            // Additional error handling if needed
        }


    }

    const handleVerification = (doctorId) => {
        setVerify(true);
        toast.success('Doctor Verified');
        // setVerifiedDoctors((prevVerifiedDoctors) => [...prevVerifiedDoctors, doctorId]);
        verifyHandler(doctorId);
        console.log(doctorId);
    };


    const handleUnverification = (doctorId) => {
        // Implement unverification logic here
        // setVerifiedDoctors((prevVerifiedDoctors) => prevVerifiedDoctors.filter((id) => id !== doctorId));
        unVerifyHandler(doctorId);
        console.log('Unverified:', doctorId);
    };

    const assignDoctorPatient = async (id) => {
        formData.doctorId = id;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:4000/api/PlusCare/Home/assignDoctorPatient",
                formData,
                config
            );
            console.log(data);
            if (data) {
                // Display success notification
                toast.success("assign Patient!");
                // setUser(data);
                // localStorage.setItem("userInfo", JSON.stringify(data));
                // navigate("/dashboard");
                // setRazar(true);
                // setPatient(false);
            }
            // else{
            //     toast.error('user already assign');
            //     console.log('user already assign');
            // }
        } catch (error) {
            // toast.error("An error occurred");

            toast.error('Patient already assign');
        }
        formData.userId = "";
    };
    return (
        <div key={doctor._id} className='flex justify-between cursor-pointer'>
            <p className='w-[5%] text-gray-800 py-[1rem] text-center '>{index + 1}</p>
            <p className='w-[15%] text-gray-800 py-[1rem] text-center'>{doctor?.name}</p>
            <p className='w-[15%] text-gray-800  py-[1rem] text-center'>{doctor?.qualification}</p>
            <p className='w-[5%] text-gray-800  py-[1rem] text-center'>{doctor?.gender}</p>
            <p className='w-[25%] text-gray-800  py-[1rem] text-center text-wrap'>{doctor?.email}</p>
            <p className='w-[10%] text-gray-800  py-[1rem] text-center'>{doctor?.phoneNo}</p>


            {
                verify ?
                    (<div className='w-[25%] text-black flex gap-2 justify-center items-center'>
                        <input
                            type='text'
                            name='userId'
                            value={formData?.userId}
                            onChange={changeHandler}
                            className='pl-1 h-[3rem]' />
                        <button
                            onClick={() => {
                                assignDoctorPatient(doctor?._id);
                                formData.userId = "";
                            }}
                            className='bg-darkGreen px-3 py-2 rounded-md'
                        >ok</button>
                    </div>)
                    : (
                        <div className='w-[25%] text-black flex gap-2 justify-center items-center'>
                            {/* {!verifiedDoctors.includes(doctor._id) && (
                                <> */}
                            <button onClick={() => handleVerification(doctor?._id)} className='bg-white px-6 py-2 rounded-md'>
                                Verified
                            </button>
                            <button onClick={() => handleUnverification(doctor?._id)} className='bg-white px-6 py-2 rounded-md'>
                                UnVerified
                            </button>
                        </div>
                    )

            }

        </div>
    )
}

export default DoctorCard