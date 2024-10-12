import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { baseurl } from '../../index';

//image
import logo from "../../assets/logo.png";



//icons
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { GiBilledCap } from "react-icons/gi";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { FaPersonBreastfeeding } from "react-icons/fa6";


const DoctorDashboard = () => {

  const [show, setShow] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("userInfo"))?.data || {};
  const navigate = useNavigate();
  // console.log(user.doctor._id);

  const doctorId = user?.doctor._id;
  // console.log(doctorId);
  const [assignedPatient, setAssignPatient] = useState(null);
  console.log(assignedPatient);
  const [patient, setAllPatient] = useState(null);

  const fetchDoctor = async () => {

    try {
      const response = await axios.get(`${baseurl}/Home/doctorById/${doctorId}`);

      // Axios automatically checks for response.ok
      const data1 = response.data;
      setAssignPatient(data1.data.assignedPatients);
      console.log('Fetched Subscriber:', data1);
    } catch (error) {
      console.error('Error fetching subscriber:', error.message);
    }
  };
  const fetchallPatient = async () => {

    try {
      const response = await axios.get(`${baseurl}/Home/allSubscriber`);

      // Axios automatically checks for response.ok


      setAllPatient(response.data.Subscribers);
      console.log('Fetched all Subscriber:', response.data.Subscribers);
    } catch (error) {
      console.error('Error fetching subscriber:', error.message);
    }
  };

  const makeLiveDoctor = async (id, doctorID) => {
    try {
      const response = await axios.post(`${baseurl}/Home/makelivedoctor/${id}/${doctorID}`);
      // Handle the response
      console.log(response.data);
      toast.success(response.data.message);
      console.log('Doctor made live successfully:', response.data);
    } catch (error) {
      // Handle the error
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };




  useEffect(() => {
    fetchDoctor();
    fetchallPatient();
    // console.log(Doctor);
  }, []);

  return (
    <div className='w-full h-sereen overflow-x-hidden flex relative'>

      {/* left part*/}
      <div className='w-[20%] h-full bg-white  top-0 left-0 z-50'>
        <div className='h-[70px] overflow-hidden mb-3'>
          <Link to="/" className=''>
            <img src={logo} alt="logo" className='h-[345%] top-[-120%] relative mix-blend-multiply' />
          </Link>
        </div>

        {/* Home */}
        <Link to='/' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2 ' >
          <FaHome />
          <p>Home</p>
        </Link>

        {/* blogs */}
        <Link to='/blogs' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2' >
          <FaBlog />
          <p>Blogs</p>
        </Link>

        {/* Dashboard */}
        <button
          onClick={() => {
            setShow("dashboard");
          }}
          className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
          <FaHome />
          <p>DashBoard</p>
        </button>
        {/* Appointment */}
        <button
          onClick={() => {
            setShow("appointment");
          }}
          className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
          <GiBilledCap />
          <p>Appointment</p>
        </button>

        {/* patient */}
        <button
          onClick={() => {
            setShow("patient");
          }}
          className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
          <FaPersonBreastfeeding />
          <p>Patient</p>
        </button>


        {/* logout */}
        <button onClick={() => {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("user");
          navigate("/");
          toast.success("Logged Out");
        }} className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
          <IoIosLogOut />
          <p>Log Out</p>
        </button>
      </div>


      {/* right */}
      {
        show === "dashboard" &&
        <div className='w-[80%] h-full text-black relative bg-white rounded-lg mt-9 ml-4'  >
          <div className=' relative  rounded-md p-[2rem]  bg-slate-100 flex justify-between '>
            <div className='h-full'>
              <h1 className='text-[2.8rem] font-semibold'>Welcome 👋</h1>
              <div className='w-[30%] h-[2px] bg-red-600'></div>
              <h1 className='text-[2.4rem] text-blue font-mono leading-[3rem]'>Dr.{user?.doctor?.name}</h1>
              <p className=' capitalize my-2 text-[.9rem] font-semibold'>how a nice day at work</p>
            </div>

            <img className='h-[150px] aspect-auto ' src='/2151107498.png'
              alt='doctorBg'></img>

          </div>
          <h1 className='text-[2.05rem] mt-6'>Monthly Report</h1>
          <div className='h-[160px] bg-slate-100 w-full rounded-md flex gap-2 justify-evenly p-2'>
            <div className=" bg-white rounded-md h-full w-[33%] flex justify-center items-center flex-col gap-4">
              {/* <img className="size-4" src='' alt=''></img> */}
              <div className="text-[1.8rem] text-blue-400"><FaPersonBreastfeeding /></div>
              <p className='text-[1.2rem]'>Total Patients</p>
              <p className="">{patient?.length}</p>
            </div>

            <div className=" bg-white rounded-md h-full w-[33%] flex justify-center items-center flex-col gap-4">
              {/* <img className="size-4" src='' alt=''></img> */}
              <div className="text-[1.8rem] text-blue-400"><FaRegAddressCard /></div>
              <p className='text-[1.2rem]'>Appoinment</p>
              <p className="">{assignedPatient?.length}</p>
            </div>
            <div className=" bg-white rounded-md h-full w-[33%] flex justify-center items-center flex-col gap-4">
              {/* <img className="size-4" src='' alt=''></img> */}
              <div className="text-[1.8rem]"><IoMdMailUnread /></div>
              <p className='text-[1.2rem]'>Unread Mail</p>
              <p className=" ">0</p>
            </div>

          </div>

        </div >
      }

      {/* assign patient */}
      {
        show === "appointment" &&
        <div className='w-[80%] h-full text-black relative bg-white  mt-9 mx-[1rem]'>
          <div className='w-full '>
            <p className='text-[1.6rem] pt-4 pb-1 font-bold tracking-tight uppercase text-blue text-center'>List Of Assigned Patients</p>
            <div className='w-[10rem] h-1 bg-blue relative left-[50%] translate-x-[-50%]'></div>
          </div>
          <div className='p-4 mt-4 border-2 rounded-md '>
            <table className="border-collapse rounded-md  w-full bg-gray-200">
              <thead className=''>
                <tr className='text-gray-600 font-bold text-[1.2rem] '>
                  <th className="p-[1rem]">Serial No:</th>
                  <th className="p-[1rem]">Patients name</th>
                  <th className="p-[1rem]">Patients Gmail</th>
                  <th className="p-[1rem]">Room Id</th>
                  <th className="p-[1rem]">Contact</th>
                  <th className="p-[1rem]">Virtual call</th>
                </tr>
              </thead>

              {
                assignedPatient?.length > 0 &&
                <tbody className='bg-lightBlue'>
                  {
                    assignedPatient?.map((item, index) =>
                    (
                      <tr key={index}>
                        <td className="text-center  p-[1rem]">{index + 1}.</td>
                        <td className="text-center capitalize  p-[1rem]">{item?.childName}</td>
                        <td className=" p-[1rem] capitalize flex justify-center">{item?.email}</td>
                        <td className=" p-[1rem] text-center uppercase">R.I{user?.doctor?._id.slice(0, 3)}{item._id.slice(0, 3)}</td>
                        <td className="text-center capitalize p-[1rem]">{item?.contact}</td>
                        {
                          item?.live === "offline" ?
                            <td onClick={() => {
                              // toast.success("You are going to meet with patient");
                              makeLiveDoctor(item._id, user?.doctor._id);
                              setTimeout(() => {
                                window.open('https://www.videosdk.live/prebuilt/demo');
                              }, 2000);
                            }} className="text-center capitalize p-[1rem] cursor-pointer">📞</td>
                            :
                            (
                              <td
                                onClick={
                                  () => {
                                    makeLiveDoctor(item._id, user?.doctor._id);
                                    // toast.success("You are offline")
                                  }
                                }
                                className='text-center capitalize'>end call</td>
                            )
                        }
                        <td>
                          <Link to={`/vaccine/${item?._id}`}  className="text-center capitalize p-[1rem] cursor-pointer">▶️</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              }
            </table>

            {/* no data found */}
            <div>
              {
                assignedPatient?.length === 0 &&
                <div className='w-full h-full p-[1rem] flex justify-center items-center'>
                  <img src='https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg' alt="noData" className='h-[200px] aspect-auto' />
                </div>
              }
            </div>
          </div>
        </div>
      }

      {/* all patient */}
      {
        show === "patient" &&
        <div className='w-[80%] h-full text-black relative bg-white  mt-9 mx-[1rem]'>
          <div className='w-full '>
            <p className='text-[1.6rem] pt-4 pb-1 font-bold tracking-tight uppercase text-blue text-center'>List Of All Patients</p>
            <div className='w-[10rem] h-1 bg-blue relative left-[50%] translate-x-[-50%]'></div>
          </div>
          <div className='p-4 mt-4 border-2 rounded-md '>
            <table className="border-collapse rounded-md  w-full bg-gray-200">
              <thead className=''>
                <tr className='text-gray-600 font-bold text-[1.2rem] '>
                  <th className="p-[1rem]">Serial No:</th>
                  <th className="p-[1rem]">Patients name</th>
                  <th className="p-[1rem]">Patients Gmail</th>
                  <th className="p-[1rem]">Contact</th>
                  <th className="p-[1rem]">Virtual call</th>
                </tr>
              </thead>

              {
                patient?.length > 0 &&
                <tbody className='bg-lightBlue'>
                  {
                    patient?.map((item, index) =>
                    (
                      <tr key={index}>
                        <td className="text-center  p-[1rem]">{index + 1}.</td>
                        <td className="text-center capitalize  p-[1rem]">{item?.childName}</td>
                        <td className=" p-[1rem] capitalize flex justify-center">{item?.email}</td>
                        <td className="text-center capitalize p-[1rem]">{item?.contact}</td>
                        {
                          item?.live === "offline" ?
                            <td onClick={() => {
                              // toast.success("You are going to meet with patient");
                              makeLiveDoctor(item._id, user?.doctor._id);
                              setTimeout(() => {
                                window.open('https://www.videosdk.live/prebuilt/demo');
                              }, 2000);
                            }} className="text-center capitalize p-[1rem] cursor-pointer">📞</td>
                            :
                            (
                              <td
                                onClick={
                                  () => {
                                    makeLiveDoctor(item._id, user?.doctor._id);
                                    // toast.success("You are offline")
                                  }
                                }
                                className='text-center capitalize'>end call</td>
                            )
                        }
                      </tr>
                    ))
                  }
                </tbody>
              }
            </table>

            {/* no data found */}
            <div>
              {
                patient?.length === 0 &&
                <div className='w-full h-full p-[1rem] flex justify-center items-center'>
                  <img src='https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg' alt="noData" className='h-[200px] aspect-auto' />
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default DoctorDashboard