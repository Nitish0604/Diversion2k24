// pages part
import Home from './page/Home';
import Blogs from './page/Blogs';
import NoPage from './page/NoPage';
import Contact from './page/Contact';
import Subscription from './page/Subscription';
import DashBoard from './page/DashBoard';
import Login from './page/Login';
import Symptoms from './page/Symptoms'
import AdminDashboard from './page/AdminDashboard';
import JoinDoctor from './page/Doctor/JoinDoctor';
import DoctorDashboard from './page/Doctor/DoctorDashboard';
import Purchase from './page/Purchase';
import PateintVaccine from './page/PateintVaccine';

// components part
import Navbar from './Component/Navbar';
// import PrivateRoute from './Component/PrivateRoute';


//react components
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const excludedPaths = ['/dashboard', '/AdminDashboard', '/doctordashboard', '/purchase'];
  const location = useLocation();
  return (
    <div className="relative">
      {!excludedPaths.includes(location.pathname) && <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="symptoms" element={<Symptoms />} />
        <Route path="blogs" element={<Blogs />} />

        <Route path="login" element={<Login />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="joinDoctor" element={<JoinDoctor />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="vaccine/:id" element={<PateintVaccine />} />

        <Route path="/AdminDashboard" element={<AdminDashboard
          setIsMenuOpen={setIsMenuOpen} />} />
        <Route path="/doctordashboard" element={<DoctorDashboard
          setIsMenuOpen={setIsMenuOpen} />} />
        <Route path="/dashboard" element={
          <DashBoard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
