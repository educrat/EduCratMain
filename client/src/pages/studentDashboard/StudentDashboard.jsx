import React from 'react'
import Footer from '../../components/Home/footer/Footer';
import DefaultNavbar from '../../components/navbar/defaultNavbar/DefaultNavbar';
import Navbar from '../../components/navbar/Navbar';
import TuteeNavbar from '../../components/navbar/tuteeNavbar/TuteeNavbar';
import AllCategories from '../../components/studentDashboard/categories/AllCategories';
import CardSwiper from '../../components/swiper/CardSwiper';

import './SutdentDashboard.css'

const StudentDashboard = () => {
  return (
    <div>
      {/* <DefaultNavbar /> */}
      <AllCategories />
      <h1 className="slider_heading">Our Top Tutors</h1>
      <CardSwiper mode={"suggestions"} />
    </div>
  )
}

export default StudentDashboard;