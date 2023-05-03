import React, { useContext, useEffect } from 'react'
import AppUserContext from '../../context/AppUserContext'
import DefaultNavbar from './defaultNavbar/DefaultNavbar'
import TutorNavbar from './tutorNavbar/TutorNavbar'

const Navbar = ({ navbarType, isTutor, homepage }) => {
    const { appUser } = useContext(AppUserContext);

    useEffect(() => {
      console.log("refreshing navbar...");
    }, [appUser])
    
    
    if (navbarType) {
        if (navbarType === "default") return <DefaultNavbar appUser={appUser} homepage={homepage} isTutor={isTutor} />
        if (navbarType === "home") return <DefaultNavbar appUser={appUser} homepage={homepage} />
        if (navbarType === "dashboard") return <DefaultNavbar appUser={appUser} homepage={homepage} isTutor={isTutor} />
        if (navbarType === "tutor_dashboard") return <TutorNavbar appUser={appUser} />
    } else {
        return (
            <div>NOT A VALID NAVBAR</div>
        )
    }
}

export default Navbar