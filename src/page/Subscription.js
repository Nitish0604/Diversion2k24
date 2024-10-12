import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseurl } from '../index';

//image
import logo from "../assets/logo.png"

const Subscription = () => {

  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    guardianName: '',
    email: '',
    childName: '',
    dob: '',
    gender: '',
    contact: '',
    address: '',
    dist: '',
    state: '',
    pin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `${baseurl}/Home/newSubscriber`,
        formData
        ,
        config
      );
      console.log(data);
      const user = localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("user", "Patient");
      console.log(user);
      navigate("/");

    } catch (error) {
      toast.error("An error occurred");
    }
    setIsLoading(false);
  };





  return (
    <div className=' w-full h-fit'>

      <div className=' w-full h-fit  flex flex-col justify-center'>
        <div className='w-full text-center mb-[1rem]'>
          <div className='relative flex flex-col items-center mb-[120px] w-full h-[60px]'>
            <img src={logo} alt='logo' className='h-[500%] w-fit mix-blend-multiply' />
          </div>
          <div className='text-[2.5rem] uppercase text-center font-semibold  pt-2 mx-auto'>Subscription</div>
          <p className='text-darkGreen font-semibold'>Stay Connected: Subscribe for Exclusive Updates and Special Offers</p>
        </div>
        <div className='flex flex-col-reverse lg:flex-row justify-around items-center lg:items-start'>
          <div className='lg:w-[60%] p-4'>
            <form onSubmit={handleSubmit} className="w-[100%] h-[100%] flex flex-col gap-[2rem] p-[2rem]">
              {/* parent and child name */}
              <div className='flex md:flex-row flex-col justify-between'>
                <div className='md:w-[40%] flex flex-col'>
                  <label className="mb-2 font-semibold text-[1.1rem]" htmlFor="guardianName">Parent Name:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-[100%] h-[50px] p-2"
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='md:w-[40%] flex flex-col'>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="childName">Child Name:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-[100%] h-[50px] p-2"
                    type="text"
                    id="childName"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* email,gender and dob */}
              <div className='flex md:flex-row flex-col justify-between'>
                <div className='md:w-[50%] flex flex-col'>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="email">Parent Email:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>
                <div className='md:w-[20%] flex flex-col'>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="dob">Child's DoB:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='md:w-[20%] flex flex-col'>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor='gender'>Gender</label>
                  <select className="border-b-2 border-b-darkGreen w-full h-[50px] p-2" name="gender" id='gender' value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {/* phoneNo */}
              <div className=''>
                <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="contact">Phone Number:</label>
                <input
                  className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                  type='number'
                  id="contact"
                  name="contact"
                  placeholder='Enter Your Phone No'
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* address */}
              <div className=''>
                <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="address">Address:</label>
                <textarea
                  className="border-2 border-b-darkGreen w-full  h-[100px] p-2"
                  id="address"
                  name="address"
                  maxLength="200"
                  type='text'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* state pinCode city */}
              <div className='flex justify-between'>
                <div className='w-[30%] flex flex-col'>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="state">State:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='w-[30%] flex flex-col '>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="dist">City:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                    type="text"
                    id="dist"
                    name="dist"
                    value={formData.dist}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='w-[30%] flex flex-col '>
                  <label className='mb-2 font-semibold text-[1.1rem]' htmlFor="pin">Pincode:</label>
                  <input
                    className="border-b-2 border-b-darkGreen w-full  h-[50px] p-2"
                    type="number"
                    id="pin"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='h-[15%] flex justify-center'>
                <button className='w-[137px] h-[42px] bg-darkGreen border rounded-md px-[19px] py-[10px] flex justify-center items-center text-[#ffffff] font-roboto font-semibold tracking-tighter'>
                  {
                    isloading ? (
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) :
                      (
                        <p>Submit</p>
                      )
                  }
                </button>
              </div>
            </form>
          </div>
          <img src='https://img.freepik.com/free-vector/doctor-injecting-vaccine-patient-illustrated_23-2148821190.jpg?w=740&t=st=1706341496~exp=1706342096~hmac=b0e20ef7b95ebc1d565fb49f46ebfda4c708b45fd0e6933bd610e996986dd690'
            alt="img2" className='w-[40%] aspect-square' />

        </div>
      </div>


    </div>

  )
}

export default Subscription;