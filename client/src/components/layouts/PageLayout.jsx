import React, { useContext, useEffect } from "react";
import DefaultNavbar from "../navbar/defaultNavbar/DefaultNavbar";
import TutorNavbar from "../navbar/tutorNavbar/TutorNavbar";
import TuteeNavbar from "../navbar/tuteeNavbar/TuteeNavbar";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Home/footer/Footer";
import AppUserContext from "../../context/AppUserContext";

const PageLayout = ({ fetchingData, isTutor, navbarType, hideFooter, homepage }) => {

  const { appUser } = useContext(AppUserContext);

  useEffect(() => {
    console.log("Refreshing page layout...");
  }, [appUser])
    
  return (
    <>
      <Navbar appUser={appUser} navbarType={navbarType} homepage={homepage} />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  )
  // }

};

export default PageLayout;
