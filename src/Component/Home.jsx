import React, { useEffect, useState } from 'react'
import { BsMenuButtonWideFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import axios from 'axios';
// import { toast } from "react-hot-toast";
import DoctorCard from './DoctorCard';

function Home({ patient, doctor, dashboard }) {

    const [allSubscriber, setAllSubscriber] = useState([]);
    const [allDoctor, setAllDoctor] = useState([]);
    // const [verify, setVerify] = useState(false);


    const getAllSubscriber = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/PlusCare/Home/allSubscriber',
            headers: {
                // 'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                setAllSubscriber(response.data.Subscribers);
                // console.log(response.data.Subscribers);
            })
            .catch((error) => {
                console.log(error);
            });


    };
    const getAllDoctor = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/PlusCare/Home/allDoctors',
            headers: {
                // 'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                setAllDoctor(response.data.Doctors);
                // console.log(response.data.Doctors);
            })
            .catch((error) => {
                console.log(error);
            });


    };

    useEffect(() => {
        getAllSubscriber();
        getAllDoctor();
        // console.log("allSubscriber", allSubscriber);
        // console.log("allSubscriber", allDoctor);
    }, []);

    const data = [
        {
            name: 'Sun',
            Patient: 4000,
            doctor: 2400,
            amt: 2400,
        },
        {
            name: 'Mon',
            Patient: 3000,
            doctor: 1398,
            amt: 2210,
        },
        {
            name: 'Tue',
            Patient: 2000,
            doctor: 9800,
            amt: 2290,
        },
        {
            name: 'wed',
            Patient: 2780,
            doctor: 3908,
            amt: 2000,
        },
        {
            name: 'Thrus',
            Patient: 1890,
            doctor: 4800,
            amt: 2181,
        },
        {
            name: 'Fri',
            Patient: 2390,
            doctor: 3800,
            amt: 2500,
        },
        {
            name: 'Sat',
            Patient: 3490,
            doctor: 4300,
            amt: 2100,
        },
    ];


    // const [formData, setFormData] = useState({
    //     doctorId: '',
    //     userId: ''
    // });

    // const changeHandler = (event) => {
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    // };


    // const verifyHandler = async (id) => {
    //     try {
    //         // Your API endpoint URL
    //         console.log(id);
    //         const apiUrl = `http://localhost:4000/api/PlusCare/Home/doctorVerified/${id}`;

    //         // Your POST request using Axios
    //         const response = await axios.post(apiUrl);

    //         // Handle the response as needed
    //         console.log(response.data);

    //         // Additional actions after successful response
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error:', error.message);
    //         // Additional error handling if needed
    //     }


    // }

    // const unVerifyHandler = async (id) => {
    //     try {
    //         // Your API endpoint URL
    //         console.log(id);
    //         const apiUrl = `http://localhost:4000/api/PlusCare/Home/delDocById/${id}`;

    //         // Your POST request using Axios
    //         const response = await axios.delete(apiUrl);

    //         // Handle the response as needed
    //         console.log(response.data);

    //         // Additional actions after successful response
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error:', error.message);
    //         // Additional error handling if needed
    //     }


    // }

    // const handleVerification = (doctorId) => {
    //     setVerify(true);
    //     toast.success('Doctor Verified');
    //     verifyHandler(doctorId);
    //     console.log(doctorId);
    // };


    // const handleUnverification = (doctorId) => {
    //     // Implement unverification logic here
    //     unVerifyHandler(doctorId);
    //     console.log('Unverified:', doctorId);
    // };

    // const assignDoctorPatient = async (id) => {
    //     formData.doctorId = id;
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         };

    //         const { data } = await axios.post(
    //             "http://localhost:4000/api/PlusCare/Home/assignDoctorPatient",
    //             formData,
    //             config
    //         );
    //         console.log(data);
    //         if (data) {
    //             // Display success notification
    //             toast.success("assign Patient!");
    //             // setUser(data);
    //             // localStorage.setItem("userInfo", JSON.stringify(data));
    //             // navigate("/dashboard");
    //             // setRazar(true);
    //             // setPatient(false);
    //         }
    //         // else{
    //         //     toast.error('user already assign');
    //         //     console.log('user already assign');
    //         // }
    //     } catch (error) {
    //         // toast.error("An error occurred");

    //         toast.error('Patient already assign');
    //     }
    //     formData.userId = "";
    // };

    return (

        <>
            {/* Dashboard */}
            {
                dashboard &&
                <main className='main-container'>
                    <div className='main-title'>
                        <h3 className='text-[2rem] text-black font-semibold'>DASHBOARD</h3>
                    </div>

                    <div className='main-cards'>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>REPORTS</h3>
                                <BsMenuButtonWideFill className='card_icon' />
                            </div>
                            <h1>10</h1>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>PATIENT</h3>
                                <BsPeopleFill className='card_icon' />
                            </div>
                            <h1>{allSubscriber.length}</h1>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>Doctor</h3>
                                <BsPeopleFill className='card_icon' />
                            </div>
                            <h1>{allDoctor.length}</h1>
                        </div>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>ALERTS</h3>
                                <BsFillBellFill className='card_icon' />
                            </div>
                            <h1>42</h1>
                        </div>
                    </div>

                    <div className='charts'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Patient" fill="#8884d8" />
                                <Bar dataKey="doctor" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Patient" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="doctor" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </main>
            }
            {
                patient &&
                <div className='main-container'>
                    <p className='w-full text-center text-black text-[2.6rem] uppercase font-semibold'>List of Patients</p>
                    <div className='w-full flex justify-around text-[1.3rem] '>
                        <p className='w-[5%] text-gray-600 font-mono py-[1rem] text-center '>Sno:</p>
                        <p className='w-[20%] text-gray-600 font-mono py-[1rem] text-center '>SubscriberID</p>
                        <p className='w-[13%] text-gray-600 font-mono py-[1rem] text-center '>Guardian<br></br>Name</p>
                        <p className='w-[13%] text-gray-600 font-mono py-[1rem] text-center '>Patient<br></br>Name</p>
                        <p className='w-[9%] text-gray-600 font-mono py-[1rem] text-center '>Gender</p>
                        <p className='w-[25%] text-gray-600 font-mono py-[1rem] text-center '>Email</p>
                        <p className='w-[15%] text-gray-600 font-mono py-[1rem] text-center '>Contact</p>
                        <p className='w-[10%] text-gray-600 font-mono py-[1rem] text-center '>Assigned/<br></br>Not</p>
                    </div>
                    <div className='bg-midBlue rounded-md'>

                        {allSubscriber?.reverse()?.map((subscriber, index) => (
                            <div key={subscriber._id} className='flex justify-around hover:bg-[#ffff] cursor-pointer'>
                                <p className='w-[5%] text-gray-800 py-[1rem] text-center '>{index + 1}.</p>
                                <p className='w-[20%] text-gray-800 py-[1rem] text-center text-ellipsis '>{subscriber?._id}</p>
                                <p className='w-[13%] text-gray-800 py-[1rem] text-center text-wrap'>{subscriber?.guardianName}</p>
                                <p className='w-[13%] text-gray-800  py-[1rem] text-center  text-wrap'>{subscriber?.childName}</p>
                                <p className='w-[9%] text-gray-800  py-[1rem] text-center'>{subscriber?.gender}</p>
                                <p className='w-[25%] text-gray-800  py-[1rem] text-center'>{subscriber?.email}</p>
                                <p className='w-[15%] text-gray-800  py-[1rem] text-center'>{subscriber?.contact}</p>
                                {
                                    subscriber?.assignedDoctor ?
                                    <p className='w-[10%] text-gray-800  py-[1rem] text-center'>✅</p>
                                    :
                                    <p className='w-[10%] text-gray-800  py-[1rem] text-center'>❌</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }
            {
                doctor &&
                <div className='main-container'>
                    <p className='w-full text-center text-black text-[2.6rem] uppercase font-semibold'>List of Doctor</p>
                    <div className='w-full flex justify-around text-[1.3rem] '>
                        <p className='w-[5%] text-gray-600 font-mono p-[1rem] text-center'>Sno:</p>
                        <p className='w-[15%] text-gray-600 font-mono py-[1rem] text-center'>Name</p>
                        <p className='w-[15%] text-gray-600 font-mono py-[1rem] text-center'>Qualification</p>
                        <p className='w-[5%] text-gray-600 font-mono py-[1rem] text-center'>Gender</p>
                        <p className='w-[25%] text-gray-600 font-mono py-[1rem] text-center'>Email</p>
                        <p className='w-[10%] text-gray-600 font-mono py-[1rem] text-center'>Contact</p>
                        <p className='w-[25%] text-gray-600 font-mono py-[1rem] text-center'>Button</p>
                    </div>
                    <div className='bg-midBlue rounded-md'>

                        {allDoctor.map((doctor, index) => (
                            <DoctorCard doctor={doctor} index={index} key={index}/>
                        ))}
                    </div>
                </div>
            }



        </>

    )
}

export default Home