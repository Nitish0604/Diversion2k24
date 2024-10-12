import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    const userBehavior = (localStorage.getItem("user")) || "";
    let isLoggedIn = userBehavior;
    return (
        <div className='w-full min-h-[200px] bg-midBlue py-2'>
            <div className='flex md:flex-row flex-col max-w-[1200px] w-full justify-around items-center h-full mx-auto'>
                {/* Children */}
                {
                    isLoggedIn &&
                    <Link to="/blogs" className=' h-full w-full md:w-[33%]'>
                        <div className='md:border-r-2  border-darkGreen mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>Children</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto border-b-2 border-darkGreen pb-4 md:border-none'>
                                "Embark on the joyous journey of new parenthood with our comprehensive vaccine and healthcare guidance. Ensure a healthy start for your newborn with expert support and personalized care."
                            </p>
                        </div>
                    </Link>
                }
                {
                    !isLoggedIn &&
                    <Link to="/login" className='  h-full w-full md:w-[33%]'>
                        <div className=' md:border-r-2  border-darkGreen mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>Children</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto border-b-2 border-darkGreen pb-4 md:border-none'>
                                "Embark on the joyous journey of new parenthood with our comprehensive vaccine and healthcare guidance. Ensure a healthy start for your newborn with expert support and personalized care."
                            </p>
                        </div>
                    </Link>
                }
                {/* pregnant lady */}

                {
                    isLoggedIn &&
                    <Link to="/blogs" className='  h-full w-full md:w-[33%]'>
                        <div className='border-r-2  border-darkGreen mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>pregnant lady</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto border-b-2 border-darkGreen pb-4 md:border-none'>
                                "Experience optimal maternal care with our personalized health services. From routine check-ups to tailored advice, we ensure a healthy pregnancy journey, prioritizing both mother and baby's well-being."
                            </p>
                        </div>
                    </Link>
                }
                {
                    !isLoggedIn &&
                    <Link to="/login" className='h-full w-full md:w-[33%]'>
                        <div className='border-r-2  border-darkGreen mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>pregnant lady</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto border-b-2 border-darkGreen pb-4 md:border-none'>
                                "Experience optimal maternal care with our personalized health services. From routine check-ups to tailored advice, we ensure a healthy pregnancy journey, prioritizing both mother and baby's well-being."
                            </p>
                        </div>
                    </Link>
                }
                {/* old people */}

                {
                    isLoggedIn &&
                    <Link to="/blogs" className='  h-full w-full md:w-[33%]'>
                        <div className='mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>Elderly</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto border-b-2 border-darkGreen pb-4 md:border-none'>"Empower your golden years with dedicated healthcare. Tailored check-ups, preventive measures, and compassionate support ensure a healthy and fulfilling life for elderly gentlemen. Prioritize well-being with us."
                            </p>
                        </div>
                    </Link>
                }
                {
                    !isLoggedIn &&
                    <Link to="/login" className='  h-full w-full md:w-[33%]'>
                        <div className='mt-6 p-2'>
                            <h2 className='text-[1.2rem] font-bold text-blue uppercase text-center'>Elderly</h2>
                            <div className='w-[50px] h-[5px] bg-darkGreen mb-4 relative left-[50%] translate-x-[-50%] mt-1'></div>
                            <p className='md:w-full w-[60%] mx-auto'>"Empower your golden years with dedicated healthcare. Tailored check-ups, preventive measures, and compassionate support ensure a healthy and fulfilling life for elderly gentlemen. Prioritize well-being with us."
                            </p>
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}

export default About