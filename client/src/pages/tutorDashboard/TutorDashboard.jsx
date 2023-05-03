import React, { useContext, useEffect, useState } from "react";
import ProfileProgressWrapper from "../../components/tutorDashboard/leftSide/profileProgressWrapper/ProfileProgressWrapper";
import OrderStatus from "../../components/tutorDashboard/rightSide/orderStatus/OrderStatus";
import "./TutorDashboard.css";
import DashboardGig from "../../components/tutorDashboard/rightSide/dashboardGig/DashboardGig";
import CreateNewGig from "../../components/createNewGig/CreateNewGig";
import { backendURL } from "../../data/vars";
import AppUserContext from "../../context/AppUserContext";
import axios from "axios";

const TutorDashboard = () => {
  const { appUser } = useContext(AppUserContext);
  const [userData, setUserData] = useState();
  const [overallRating, setOverallRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (appUser) {
      axios
        .get(backendURL + "/api/user/" + appUser._id)
        .then((res) => {
          setRatingCount(0);
          setOverallRating(0);

          console.log(res.data.user);
          setUserData(res.data.user);

          res.data.user.feedbackInfo.map((feedback) => {
            if (
              feedback?.tutorId === appUser._id &&
              feedback?.studentRating != 0
            ) {
              console.log(">>> " + feedback._id);
              setOverallRating(
                (prevRating) => prevRating + feedback?.studentRating
              );
              setRatingCount((prevCount) => prevCount + 1);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [appUser]);

  return (
    <div className="tutor_dashboard_page">
      <div className="dashboard_container">
        {/* <div className="left_side">
          <ProfileProgressWrapper
            ratingCount={ratingCount}
            overallRating={overallRating}
            userData={userData}
          />
        </div> */}

        <div className="gig_title">
          <div className="gig_heading">Your Gigs:</div>
        </div>
        <div className="dashboard-gig-wrapper">
          <div className="dashboard-gig-container">
            {userData &&
              userData.gigsInfo &&
              userData.gigsInfo.map((gig, index) => (
                <DashboardGig key={index} userData={userData} gig={gig} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
