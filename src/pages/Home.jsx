import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import FAQ from '../components/FAQ'
import WhyChooseUs from '../components/WhyChooseUs'

const Home = () => {
  return (
    <div className='min-h-screen bg-base-100 text-base-content'>
<Banner />
<Categories />
<WhyChooseUs />
<FAQ />
    </div>
  )
}

export default Home
