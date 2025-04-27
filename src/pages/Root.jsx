import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicTitle from '../components/DynamicTitle';

const Root = () => {
  const { user, logout } = useAuth(); 

  return (
    <div className='flex flex-col min-h-screen bg-base-100 text-base-content'>
      <Navbar />
      <DynamicTitle />
      
      {/* Main content section */}
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
