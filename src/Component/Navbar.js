import React, { useState, useEffect } from 'react'
import { Link, NavLink} from 'react-router-dom'
import logo from "../assets/logo.png"
import { toast } from "react-hot-toast"
import { LuMenu } from "react-icons/lu";
import "./Navbar.css";
import axios from 'axios';
import { baseurl } from '../index';

const Navbar = (props) => {
    const userBehavior = (localStorage.getItem("user")) || "";
    const user = JSON.parse(localStorage.getItem("userInfo"))?.data?.user;
    // console.log(user);
    console.log(userBehavior);
    let isLoggedIn = userBehavior;
    let isMenuOpen = props?.isMenuOpen;
    let setIsMenuOpen = props?.setIsMenuOpen;
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    const [subscriber, setSubscriber] = useState(user);
    console.log(subscriber);


    const handleResize = () => {
        // Update the state based on the screen size
        setIsSizeOpen(window.innerWidth >= 768);
    };



    const fetchSubscriber = async (subscriberId) => {
        try {
            const response = await axios.get(`${baseurl}/Home/subscriberById/${subscriberId}`);

            // Axios automatically checks for response.ok
            const data = response.data.data;
            setSubscriber(data);
            console.log('Fetched Subscriber:', data);

            if (userBehavior === "Patient") {


                //check if the last package is purchased
                const response2 = await axios.get(`${baseurl}/Home/packageById/${data?.packages[data.packages.length - 1]}`);
                console.log(response2.data);
                const lastPackage = response2?.data.val;
                const lastPackageDuration = lastPackage?.packageDuration.slice(0, 2) * 30 * 24 * 60 * 60 * 1000;
                console.log(lastPackageDuration);
                console.log("Package remaining: ", Date.now() - new Date(lastPackage?.updatedAt).getTime());

                if (Date.now() - new Date(lastPackage.updatedAt).getTime() < lastPackageDuration) {
                    setIsPurchaseOpen(true);
                }
            }

        } catch (error) {
            console.error('Error fetching subscriber:', error.message);
        }
    };



    // Add a listener for screen size changes
    useEffect(() => {
        // Call handleResize on initial render to set the initial state
        handleResize();
        // const subscriberId = userBehavior === "Patient" ? user?._id : location?.state?._id;
        if (userBehavior === "Patient") {
            fetchSubscriber(user?._id);
        }
        


        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ ]);

    return (
        <div className='w-[100%] h-fit bg-darkGreen sticky top-0 z-[100] '>
            <div className='w-[100%] max-w-[1600px] min-h-[60px] bg-darkGreen flex flex-wrap items-center md:gap-[1rem] justify-around text-gray-200 mx-auto'>
                {/* logo */}
                <Link to="/" className='h-[60px] md:w-[20%] overflow-hidden'>
                    <img src={logo} alt="logo" className='h-[345%] top-[-120%] relative mix-blend-multiply' />
                </Link>
                {/* LuMenu */}
                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className='text-[2rem] md:hidden block'>
                    <LuMenu />
                </button>

                {/* Links */}
                {
                    (isSizeOpen || isMenuOpen) &&
                    <div className='absolute border-2 md:border-none top-10 right-2 md:relative md:top-0 md:right-0 bg-white md:bg-transparent text-black md:text-gray-200  md:flex md:w-[75%] gap-[2rem] items-center justify-around flex-wrap md:py-4'>
                        <div className='flex md:flex-row  flex-col md:justify-start justify-center lg:gap-[2rem] md:font-semibold text-[1.2rem]'>
                            <NavLink to="/"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className='md:border-none border-t-2 py-[.5rem] md:p-0 w-full text-center'>Home</NavLink>
                            <NavLink to="/blogs"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className='md:border-none border-t-2 py-[.5rem] md:p-0 w-full text-center '>Blogs</NavLink>
                            {/* <NavLink to="/contact"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className='md:border-none border-t-2 py-[.5rem] md:p-0 lg:text-nowrap text-center '>Contact Us</NavLink> */}
                            <NavLink to="/symptoms"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className='md:border-none border-t-2 py-[.5rem] md:p-0 w-full text-center px-[.5rem] lg:text-nowrap '>Check Symptoms</NavLink>
                        </div>

                        {/* login subscription dashboard LogOut */}
                        <div className='flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-x-4'>
                            {!isLoggedIn &&
                                <Link to="/joinDoctor"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    className=' md:border-none border-t-2 w-full text-center'>
                                    {
                                        isSizeOpen ? (<button className="hidden md:block py-[.5rem] md:p-0 button55 text-nowrap">
                                            Join As Doctor
                                        </button>) : (<button className="md:hidden py-[.5rem] md:p-0">
                                            Join As Doctor
                                        </button>)
                                    }


                                </Link>
                            }
                            {!isLoggedIn &&
                                <Link to="/login"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    className='md:border-none border-t-2 w-full text-center'>
                                    {
                                        isSizeOpen ? (<button className="hidden md:block py-[.5rem] md:p-0 button55">
                                            Log In
                                        </button>) : (<button className="md:hidden py-[.5rem] md:p-0">
                                            Log In
                                        </button>)
                                    }


                                </Link>
                            }
                            {!isLoggedIn &&
                                <Link to="/subscription"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    className=' md:border-none border-t-2 w-full text-center'>
                                    <button className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg'>
                                        Subscription
                                    </button>
                                </Link>
                            }
                            {isLoggedIn &&
                                <Link to="/"
                                    className=' md:border-none border-t-2 w-full text-center'>
                                    <button onClick={() => {
                                        setIsMenuOpen((prev) => !prev);
                                        localStorage.removeItem("userInfo");
                                        localStorage.removeItem("user");
                                        toast.success("Logged Out");
                                    }}
                                        className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg'>
                                        Log Out
                                    </button>
                                </Link>
                            }
                            {isLoggedIn &&
                                (
                                    userBehavior === "Patient" ?
                                        (<Link to="/dashboard"
                                            onClick={() => setIsMenuOpen((prev) => !prev)}
                                            className=' md:border-none border-t-2 w-full text-center'>
                                            {
                                                isSizeOpen ? (<button
                                                    className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg button55'>
                                                    Dashboard
                                                </button>) : (<button
                                                    className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg'>
                                                    Dashboard
                                                </button>)
                                            }


                                        </Link>)
                                        : (<Link to="/doctordashboard"
                                            onClick={() => setIsMenuOpen((prev) => !prev)}
                                            className=' md:border-none border-t-2 w-full text-center'>
                                            {
                                                isSizeOpen ? (<button
                                                    className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg button55'>
                                                    Dashboard
                                                </button>) : (<button
                                                    className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg'>
                                                    Dashboard
                                                </button>)
                                            }


                                        </Link>)

                                )
                            }

                            {isLoggedIn && userBehavior === "Patient" && !isPurchaseOpen &&
                                <Link to="/purchase"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                    className=' md:border-none border-t-2 w-full text-center'>
                                    <button className='md:px-5 py-[.5rem] md:border-2 md:rounded-lg'>
                                        Purchase
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                }



            </div>
        </div>
    )
}

export default Navbar