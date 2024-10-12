import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { GiBilledCap } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { toast } from "react-hot-toast";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { GiLoveInjection } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios, { all } from 'axios';
import { baseurl } from '../index';

const DashBoard = () => {
  const patient = 'infant';
  const [Vaccine, setVaccine] = useState(true);
  const [show, setshow] = useState("dashboard");
  const [allDoctor, setAllDoctor] = useState([]);
  const [allPackages, setAllPackages] = useState([]);

  const [showPackages, setShowPackages] = useState(false);
  const data = [
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
      "Age": "At 6 weeks,10 weeks and14 weeks (OPV can be given till five years of age)",
      "Dose": "2 drops",
      "Route": "Oral",
      "Site": "Oral"
    },
    {
      "Vaccine": "DPT 1,2 and3",
      "Age": "At 6 weeks,10 weeksand14weeks(DPTcan be given till one year of age)",
      "Dose": "2 drops",
      "Route": "Intra-Muscular",
      "Site": "Antero-lateral side of mid-thigh"
    },
    {
      "Vaccine": "Hepatitis B Pentavalent",
      "Age": "Hepatitis B can be completed months–12 months.(Measles can be given till5 years ofage)",
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

  ]

  const user = JSON.parse(localStorage.getItem("userInfo"))?.data || {};

  const navigate = useNavigate();
  console.log(user);

  const userId = user?.user?._id; // Replace this with your actual user ID
  console.log(user);

  const [subscriber, setSubscriber] = useState(user);

  const getAllDoctor = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseurl}/Home/allDoctors`,
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

  const getPackageByuserId = async () => {
    try {
      const response = await axios.get(`${baseurl}/Home/getPackageByuserId/${userId}`);
      console.log(response.data);
      setAllPackages(response.data.packages);
    }
    catch (error) {
      console.error('Error fetching subscriber:', error.message);
    }
  }

  const fetchSubscriber = async () => {
    try {
      const response = await axios.get(`${baseurl}/Home/subscriberById/${userId}`);

      // Axios automatically checks for response.ok
      const data = response.data;
      setSubscriber(data);
      // console.log('Fetched Subscriber:', data);
    } catch (error) {
      console.error('Error fetching subscriber:', error.message);
    }
  };

  const makeLiveSubscriber = async (id, doctorID) => {
    try {
      await axios.post(`${baseurl}/Home/makelivesubscriber/${id}/${doctorID}`);
      // Handle the response
      // console.log('Success:', response.data);
    } catch (error) {
      // Handle the error
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getAllDoctor();
    fetchSubscriber();
    getPackageByuserId();
    if (allPackages) {
      if (allPackages?.length > 0) {
        alert("Buy New Package");
        const lastPackageDuration = allPackages[allPackages.length - 1]?.packageDuration.slice(0, 2) * 30 * 24 * 60 * 60 * 1000;
        console.log(lastPackageDuration);
        console.log("Package remaining: ", Date.now() - new Date(allPackages[allPackages.length - 1].updatedAt).getTime());
        if (Date.now() - new Date(allPackages[allPackages.length - 1].updatedAt).getTime() < lastPackageDuration) {
          alert("Your package is expired");
        }
      } 
    }


  }, []);



  return (
    <div>
      <div className='flex w-full h-screen'>
        {/* left button*/}
        <div className='w-[20%] h-[100%] bg-white pt-[2rem]'>
          <div className='h-[70px] overflow-hidden mb-3'>
            <Link to="/" className=''>
              <img src={logo} alt="logo" className='h-[345%] top-[-120%] relative mix-blend-multiply' />
            </Link>
          </div>
          <Link to='/' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2 ' >
            <FaHome />
            <p>Home</p>
          </Link>


          <Link to='/blogs' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2' >
            <FaBlog />
            <p>Blogs</p>
          </Link>


          {/* dashboard */}
          <button
            onClick={() => {
              setshow("dashboard");
            }} className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
            <FaHome />
            <p>DashBoard</p>
          </button>

          {/* appointment */}
          <button
            onClick={() => {
              setshow("appointment");
            }} className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
            <GiBilledCap />
            <p>Appointment</p>
          </button>

          {patient === 'infant' ?
            (<button
              onClick={() => setVaccine((prev) => !prev)}
              className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
              <GiLoveInjection />
              {
                Vaccine ? (<p>Show Vaccine Name</p>) : (<p>Vaccine Data</p>)
              }
            </button>)
            : (<div></div>)
          }

          {/* <Link to='/contact' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
            <FaPhoneAlt />
            <p>Contact Us</p>
          </Link> */}

          {/* check symptoms */}
          <Link to='/symptoms' className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
            <IoShieldCheckmarkSharp />
            <p>Check Symptoms</p>
          </Link>


          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("user");
              navigate("/");
              toast.success("Logged Out");
            }}
            className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white gap-2'>
            <IoIosLogOut />
            <p>Log Out</p>
          </button>
        </div>

        {/* right */}


        {
          show === "dashboard" &&
          <div className='w-[80%] h-full p-[1rem] text-black relative overflow-scroll dashboardScroll'  >
            <h1 className='text-[2.8rem] font-semibold'>Welcome <span className='text-blue'>{user?.user?.childName}</span>!</h1>
            <div className='w-[30%] h-[2px] bg-red-600'></div>
            <p className=' capitalize my-2'>how are you feeling today?</p>


            <div className='mt-4 relative h-[240px] rounded-md  py-10 bg-darkGreen '>
              <h1 className='text-[2.2rem] ml-3 w-[50%]  text-white leading-10'>Find the best Doctor with Plus care</h1>
              <p className='ml-3 text-white mt-3'>Appoint the doctor and get finest medical service</p>
              <img className='size-[400px] right-4 absolute -bottom-10 ' src='/18784742_cuteanimated_269-removebg-preview (1).png'
                alt='doctorBg'></img>
            </div>

            {/* Show Purchased Packages */}
            <div className='mt-6'>
              {
                allPackages.length > 0 &&
                <button
                  onClick={() => setShowPackages(prev => !prev)}
                  className='px-4 py-2 bg-darkGreen text-white rounded-md'>
                  {showPackages ? 'Hide Purchased Packages' : 'Show Purchased Packages'}
                </button>
              }

              {showPackages && allPackages.length > 0 && (
                <div className='mt-4'>
                  <table className="border-collapse w-full text-center">
                    <thead>
                      <tr className='text-gray-600 font-mono'>
                        <th className="p-[1rem]">Sno:</th>
                        <th className="p-[1rem]">Package Name</th>
                        <th className="p-[1rem]">Buy Date</th>
                        <th className="p-[1rem]">Order Id</th>
                        <th className="p-[1rem]">Amount</th>
                        <th className="p-[1rem]">Description</th>
                        <th className="p-[1rem]">Status</th>
                      </tr>
                    </thead>
                    <tbody className='bg-lightBlue text-black text-center capitalize cursor-pointer'>
                      {allPackages.map((pkg, index) => (
                        <tr key={index}>
                          <td className="p-[1rem]">{index + 1}.</td>
                          <td className="p-[1rem]">{pkg.packageName}</td>
                          <td className="p-[1rem]">{new Date(pkg.updatedAt).toLocaleDateString()}</td>
                          <td className="p-[1rem]">{pkg.orderId}</td>
                          <td className="p-[1rem]">{pkg.packageAmount}</td>
                          <td className="p-[1rem] relative group">
                            {/* Shortened Description */}
                            {pkg.description.slice(0, 30) + "..."}

                            {/* Full Description Tooltip */}
                            <span className="absolute left-0 top-full w-[280px] bg-gray-900 text-white p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out z-10">
                              {pkg.description}
                            </span>
                          </td>

                          <td className="p-[1rem] font-[500] text-darkGreen">{pkg.paymentStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* vaccine List */}
            {
              Vaccine ?
                (<>
                  <div className='w-full '>
                    <p className='text-[1.6rem] pt-4 pb-1 font-bold tracking-tight uppercase text-blue text-center'>List Of Vaccine</p>
                    <div className='w-[10rem] h-1 bg-blue relative left-[50%] translate-x-[-50%]'></div>
                  </div>
                  <div className='p-4 mt-4 border-2 rounded-md'>
                    <table className="border-collapse rounded-md  w-full">
                      <thead className=''>
                        <tr className='text-gray-600 font-mono '>
                          <th className="p-[1rem]">Serial No:</th>
                          <th className="p-[1rem]">Vaccine</th>
                          <th className="p-[1rem]">Age</th>
                          <th className="p-[1rem]">Dose</th>
                          <th className="p-[1rem]">Site</th>
                        </tr>
                      </thead>

                      <tbody className='bg-lightBlue'>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center  p-[1rem]">{index + 1}</td>
                            <td className="text-center capitalize  p-[1rem]">{item.Vaccine}</td>
                            <td className=" p-[1rem] capitalize">{item.Age}</td>
                            <td className="text-center capitalize p-[1rem]">{item.Dose}</td>

                            <td className=" p-[1rem]">{item.Site}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>)
                : (<div>
                  <div className='w-full '>
                    <p className='text-[1.6rem] pt-4 pb-1 font-bold tracking-tight uppercase text-blue text-center'>List Of Vaccine</p>
                    <div className='w-[10rem] h-1 bg-blue relative left-[50%] translate-x-[-50%]'></div>
                  </div>
                  <div className='p-4 mt-4 border-2 rounded-md'>
                    <table className="border-collapse rounded-md  w-full">
                      <thead className=''>
                        <tr className='text-gray-600 font-mono '>
                          <th className="p-[1rem]">Serial No:</th>
                          <th className="p-[1rem]">Vaccine Name</th>
                          <th className="p-[1rem]">Docter Name</th>
                          <th className="p-[1rem]">Vaccine Date(MM/DD/YY)</th>

                        </tr>
                      </thead>

                      <tbody className='bg-lightBlue'>
                        {subscriber?.data?.vaccines?.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center  p-[1rem]">{index + 1}.</td>
                            <td className="text-center capitalize  p-[1rem]">{item?.vaccineName}</td>
                            <td className=" p-[1rem] capitalize flex justify-center">Dr. {item?.doctor.name}</td>
                            <td className="text-center capitalize p-[1rem]">{new Date(item?.updatedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>)
            }


          </div >
        }

        {
          show === "appointment" &&
          <div className='w-[80%] h-full p-[1rem] text-black relative overflow-scroll dashboardScroll' >
            <div className='text-black top-[80px] h-fit '>
              <p className='text-center text-[3rem] text-darkGreen font-semibold uppercase pb-[2rem] '>Doctor List</p>
              <div className='flex flex-col gap-[.5rem]'>
                {allDoctor.map((doctor) => (
                  <div key={doctor._id} className='flex gap-[1rem] justify-between items-center rounded-md border-2 w-full px-[1rem] py-[.5rem] text-[1.1rem] font-mono bg-gray-100 uppercase'>
                    {
                      doctor?.gender === "male" ?
                        (
                          <div className='relative'>
                            <img
                              className='w-[60px] border-[1px] aspect-square rounded-full'
                              src="https://alhyatt.com/vezubygl/2024/01/doctor-placeholder-1.png"></img>
                            {
                              doctor?._id === subscriber?.data?.assignedDoctor[subscriber?.data?.assignedDoctor.length - 1] &&
                              <p className='absolute top-[-10%] left-[70%]'>⭐</p>
                            }
                          </div>
                        )

                        :
                        (
                          <div className='relative'>
                            <img
                              className='w-[60px] border-2 aspect-square rounded-full object-fill'
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPM74NTSLnSOyb655wIZGoz3WIlLJfH06khg&s"></img>
                            {
                              doctor?._id === subscriber?.data?.assignedDoctor[subscriber?.data?.assignedDoctor.length - 1] &&
                              <p className='absolute top-[-10%] left-[70%]'>⭐</p>
                            }
                          </div>
                        )

                    }

                    <p className='w-[10%] text-gray-800 py-[1rem] text-center '>Dr. {doctor?.name}</p>
                    <p className='w-[10%] text-gray-800  py-[1rem] text-center'>{doctor?.qualification}</p>
                    {
                      doctor?._id === subscriber?.data?.assignedDoctor[subscriber?.data?.assignedDoctor.length - 1] ?
                        (

                          <p className='w-[5%] text-gray-800  py-[1rem] text-center'>R.I{doctor?._id?.slice(0, 3)}{subscriber?.data?._id.slice(0, 3)}</p>
                        )
                        :
                        (
                          <p className='w-[5%] text-gray-800  py-[1rem] text-center'>R.I{doctor?._id?.slice(0, 2)}***{subscriber?.data?._id.slice(2, 3)}</p>
                        )
                    }
                    <p className='w-[25%] text-gray-800  py-[1rem] text-center text-wrap'>{doctor?.email}</p>

                    {
                      doctor?.live === "offline" ? (
                        <Link
                          onClick={() => {
                            if (user?.user?.packages.length > 0) {
                              // Check if the user is currently online
                              if (user?.user?.live !== "offline") {
                                // Show an error if the user is already online
                                toast.error("You are showing online");
                              } else {
                                // Initiating the live subscriber function if user has an active package
                                makeLiveSubscriber(subscriber?.data?._id, doctor?._id);
                                toast.success("You are going to meet with the doctor");
                              }
                            } else {
                              // Show error if the user does not have packages
                              toast.error("You need a package to make a call");
                            }
                          }}
                          target='_blank'
                          to={user?.user?.packages.length > 0 ? 'https://www.videosdk.live/prebuilt/demo'
                            : '/purchase'}
                        >
                          <span className="text-center px-6 py-3 border-2 border-black bg-lightBlue rounded-md text-nowrap capitalize font-semibold">
                            Make virtual call
                          </span>
                        </Link>
                      ) : (
                        <p
                          onClick={() => {
                            makeLiveSubscriber(subscriber?.data?._id, doctor?._id); // End the live session
                            toast.success("You ended the call");
                          }}
                          className='text-darkGreen hover:text-red-600 text-center cursor-pointer'
                        >
                          End call
                        </p>
                      )
                    }



                  </div>
                ))}
              </div>

            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default DashBoard
