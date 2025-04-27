import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FAQ from '../components/FAQ';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Banner />
      <Categories />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
};

export default Home;
