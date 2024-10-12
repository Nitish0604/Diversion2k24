import React from 'react';


//components parts
import Hero from '../Component/Hero';
import About from '../Component/About';
import StepPage from '../Component/StepPage';
import Footer from '../Component/Footer';
import ScheduleDoctor from '../Component/ScheduleDoctor';
import ChooseUs from '../Component/ChooseUs';





const Home = () => {
  return (
    <div>
      <Hero />
      <About  />
      <StepPage />
      <ChooseUs />
      <ScheduleDoctor />
      <Footer />
      
    </div>
  )
}

export default Home