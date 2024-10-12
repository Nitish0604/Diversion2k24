import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

const JoinDoctor = () => {

  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    gender: '',
    qualification: '',
    address: '',
    description: '',
    yearsOfExperience: '',
  });


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
        "http://localhost:4000/api/PlusCare/Home/newDoctor",
        formData
        ,
        config
      );
      console.log(data);

      // localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/");
      toast.success("Application Submitted Successfully");

    } catch (error) {
      toast.error("An error occurred");
    }
    setIsLoading(false);
    // resetForm();
  };

  return (
    <div>

      <div className="w-full relative min-h-[130vh] overflow-hidden text-center text-slate-950">

        <img
          className="absolute top-[10px] ] rounded-[27px] w-[30%] h-[75%] object-cover"
          alt="doctor"
          src="/rectangle-5.png"
        />
        <div className="absolute top-[2rem] right-[2rem] w-[60%] min-h-[80vh] h-fit rounded-lg text-lg p-4" >
          <div className='text-[2.5rem] uppercase text-center font-semibold  pt-2 mx-auto mb-[2rem]'>
            Join as Doctor
          </div>
          <p className='text-darkGreen font-semibold mb-[3rem]'>Join Our Medical Team: Complete the Form to Begin Your Journey with Us</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[1.5rem]'>
            <div className='flex flex-col gap-[1.5rem] justify-evenly w-full '>
              {/* Name and mail */}
              <div className=' w-full flex h-[33%] justify-around '>
                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="name">Name:</label>
                  <input
                    className=" border-b-2 border-b-darkGreen w-[90%] h-[50px] p-2"
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter Your Name without DR.'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="email">Email:</label>
                  <input
                    className=" border-b-2 border-b-darkGreen w-[90%] h-[50px] p-2"
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter Your Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* phone and gender */}
              <div className=' w-full flex h-[33%] justify-around '>
                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="phoneNo">Phone Number:</label>
                  <input
                    className=" border-b-2 border-b-darkGreen w-[90%] h-[50px] p-2"
                    type="number"
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange}
                    className=' border-b-2 border-b-darkGreen w-[50%] h-[50px] p-2'>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

              </div>
              {/* qualification and gender */}
              <div className=' w-full flex h-[33%] justify-around '>
                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="qualification">Qualification:</label>
                  <input
                    className="  border-b-2 border-b-darkGreen w-[90%] h-[50px] p-2"
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='flex flex-col items-start w-[50%]'>
                  <label htmlFor="yearsOfExperience">YRS EXP:</label>
                  <input
                    type="text"
                    className=" border-b-2 border-b-darkGreen w-[90%] h-[50px] p-2"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div >
            </div>

            {/* address */}

            <div className='flex flex-col items-start'>
              <label htmlFor="address">Address:</label>
              <textarea
                className=" border-2 border-b-darkGreen w-[100%] h-[100px] p-2 "
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* description */}
            <div className='flex flex-col items-start'>
              <label htmlFor="description">
                Description:
                <small>(Provide any additional information you'd like to share)</small>
              </label>
              <textarea
                className=" border-2 border-b-darkGreen w-[100%] h-[100px] p-2"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className='mt-4 w-[40%] relative left-[50%] translate-x-[-50%] bg-darkGreen px-4 py-2 rounded-lg text-white font-bold'>
              {
                isloading ? (
                  <span className="">Loading...</span>

                ) :
                  (
                    <p>Submit</p>
                  )
              }
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default JoinDoctor
