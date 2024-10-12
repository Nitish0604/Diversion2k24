import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StepPage = (props) => {
    const userBehavior = (localStorage.getItem("user")) || "";
    let isLoggedIn = userBehavior;
    const [patient, setPatient] = useState(true);
    return (
        <div className='w-full h-fit mt-[3rem]'>
            <div className='max-w-[1600px] w-full p-2 mx-auto'>
                <div className='w-full flex flex-col gap-4 items-center mt-2 mb-4'>
                    <div className='text-[1.4rem] text-blue font-bold uppercase'>Step How To Use</div>
                    <div className='w-[300px] bg-darkGreen h-[4px] mb-3'></div>
                    <div >
                        <button className= {`${patient ? ('bg-darkGreen') : 'bg-lightGreen'} rounded-[50px] px-9 py-3 text-[1.1rem] font-semibold bg-darkGreen mr-2`} onClick={() => setPatient(true)} >Patient</button>
                        <button onClick={() => setPatient(false)} className={`${patient ? ('bg-lightGreen') : 'bg-darkGreen'} rounded-[50px] px-9 py-3 text-[1.1rem] font-semibold bg-darkGreen ml-2`}>Doctor</button>
                    </div>
                </div>

                {
                    patient &&
                    <div className='w-fit mx-auto flex flex-col md:flex-row  gap-[3rem]'>
                        <div className='w-full mx-auto max-w-[350px] border-2 rounded-md '>
                            <img className='mx-auto w-[70%] aspect-square' src="https://img.freepik.com/free-vector/subscriber-concept-illustration_114360-3453.jpg?w=740&t=st=1706105581~exp=1706106181~hmac=276d1800c19ac3e347a4f3cd75e059aa31b25a2c9d6f689ad93b2a265033e379" alt='subscription'></img>
                            <div className='w-full h-[250px] flex flex-col items-center justify-center gap-2'>
                                <p className='text-[1.2rem] text-darkGreen font-semibold uppercase'>Go To Subscription Page</p>
                                <p className='w-[90%] text-center'>Unlock exclusive benefits and stay updated with our premium subscription. Enjoy access to curated content, special offers, and a personalized experience. Subscribe now for an journey!</p>
                                {
                                    isLoggedIn &&
                                    <Link to='/dashboard'>
                                        <button className='relative left-[50%] translate-x-[-50%] px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Subscribe</button>
                                    </Link>
                                }
                                {
                                    !isLoggedIn &&
                                    <Link to='/subscription'><button className='relative left-[50%] translate-x-[-50%] px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'> Take Subscription</button>
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className='w-full mx-auto max-w-[350px] border-2 rounded-md'>
                            <img className='mx-auto w-[70%] aspect-square' src='https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1706105627~exp=1706106227~hmac=de0c20994a693d34dd320ba6b771fa5ee0d85ca674f543c7fccd146b17848313' alt='login'></img>
                            <div className='w-full h-[250px] flex flex-col items-center justify-center gap-2'>
                                <p className='text-[1.2rem] text-darkGreen font-semibold uppercase'>Login with Id & Password</p>
                                <p className='w-[90%] text-center'>Access your personalized account with ease. Enter your credentials to unlock a world of features, exclusive content, and seamless interaction. Log in for a tailored experience now</p>
                                {
                                    isLoggedIn &&
                                    <Link to='/dashboard' >
                                        <button className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>You Login See dashboard</button>
                                    </Link>
                                }
                                {
                                    !isLoggedIn &&
                                    <Link to='/login' >
                                        <button className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Log In</button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    !patient &&
                    <div className='w-fit mx-auto flex flex-col md:flex-row  gap-[3rem]'>
                        <div className='w-full mx-auto max-w-[350px] border-2 rounded-md '>
                            <img className='mx-auto w-[100%] h-[250px]' src="https://img.freepik.com/free-photo/we-are-hiring-concept_23-2150902121.jpg?w=1060&t=st=1706107296~exp=1706107896~hmac=91b582a2ed17260f890f56db669f56fec6e240aa4d64cf832930cf524f373e65" alt='subscription'></img>
                            <div className='w-full h-[250px] flex flex-col items-center justify-center gap-2'>
                                <p className='text-[1.2rem] text-darkGreen font-semibold uppercase'>Go To Join As Doctor</p>
                                <p className='w-[90%] text-center'>Join our esteemed medical network. As a dedicated doctor, collaborate with experts, expand your practice, and contribute to improved healthcare. Elevate your profession – join us today!</p>
                                {
                                    isLoggedIn &&
                                    <Link to='/dashboard'>
                                        <button className='relative left-[50%] translate-x-[-50%] px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Subscribe</button>
                                    </Link>
                                }
                                {
                                    !isLoggedIn &&
                                    <Link to='/joinDoctor'><button className='relative left-[50%] translate-x-[-50%] px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Join Us</button>
                                    </Link>
                                }
                            </div>
                        </div>

                        <div className='w-full mx-auto max-w-[350px] border-2 rounded-md'>
                            {
                                !isLoggedIn &&
                                <img className='mx-auto w-[100%] h-[250px]' src='https://img.freepik.com/free-vector/waiting-concept-illustration_114360-5681.jpg?w=1060&t=st=1706107890~exp=1706108490~hmac=7e91deb520bb6e9e9157ee6c96b8455ed44582e97aae50cefa1a55d1b45fa3bc' alt='verification pending'></img>
                            }
                            {
                                isLoggedIn &&
                                <img className='mx-auto w-[70%] aspect-square' src='https://img.freepik.com/free-vector/approved-sign-with-shield-gradient_78370-1025.jpg?w=740&t=st=1706107602~exp=1706108202~hmac=04bd8481a7ed3690614576860e84ed1f63c82c1d89ae119d5348761ae59b1034' alt='verification'></img>
                            }
                            <div className='w-full h-[250px] flex flex-col items-center justify-center gap-2'>
                                <p className='text-[1.2rem] text-darkGreen font-semibold uppercase'>Verification Pending</p>
                                <p className='w-[90%] text-center'>Pending validation of your credentials. Thank you for your patience as we verify your information to ensure a secure and trusted experience. We appreciate your understanding.</p>
                                {
                                    isLoggedIn &&
                                    <div className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Thanks For Joining</div>
                                }
                                {
                                    !isLoggedIn &&
                                    <div className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Wait for Response Email</div>
                                }
                            </div>
                        </div>

                        <div className='w-full mx-auto max-w-[350px] border-2 rounded-md'>
                            <img className='mx-auto w-[70%] aspect-square' src='https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1706105627~exp=1706106227~hmac=de0c20994a693d34dd320ba6b771fa5ee0d85ca674f543c7fccd146b17848313' alt='login'></img>
                            <div className='w-full h-[250px] flex flex-col items-center justify-center gap-2'>
                                <p className='text-[1.2rem] text-darkGreen font-semibold uppercase'>Login with Id & Password</p>
                                <p className='w-[90%] text-center'>Access your personalized account with ease. Enter your credentials to unlock a world of features, exclusive content, and seamless interaction. Log in for a tailored experience now</p>
                                {
                                    isLoggedIn &&
                                    <Link to='/dashboard' >
                                        <button className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>You Login See dashboard</button>
                                    </Link>
                                }
                                {
                                    !isLoggedIn &&
                                    <Link to='/login' >
                                        <button className='px-10 font-semibold text-blue py-3 bg-lightGreen my-4 rounded-md'>Login</button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default StepPage;