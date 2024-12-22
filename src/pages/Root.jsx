import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Root = () => {
  const { user, logout } = useAuth(); 

  return (
    <div>

      <Navbar />


      <div className="main-content">
      
        <Outlet />
      </div>

  
     
     <Footer />
     
     
     
     
     
    </div>
  );
};

export default Root;
