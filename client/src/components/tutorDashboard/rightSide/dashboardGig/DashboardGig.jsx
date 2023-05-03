import React, { useEffect, useState } from "react";
import "./DashboardGig.css";
import { Link } from "react-router-dom";

const DashboardGig = ({ gig, userData }) => {
  /*   const [gigStatus, setGigStatus] = useState("");

  useEffect(() => {
    userData?.feedbackInfo?.map((feedback, index) => {
      if (feedback?.gigId === gig?._id) {
        if (gigStatus === "in progress" && feedback?.status === "completed") {
          setGigStatus("in progress");
        } else if (gigStatus === "under revision" && feedback?.status === "completed") {
          setGigStatus("under revision");
        } else if (gigStatus === "in progress" && feedback?.status === "under revision") {
          setGigStatus("under revision");
        } else if(feedback?.status === "completed") {
          setGigStatus(feedback?.status);
        }
      }
    })
  }, [userData]); */
  return (
    <div className="dashboard_gig_container">
      <div className=" dashboard_gig_filter_wrapper">
        <div className="dashboard_gig_main_div">
          <img
            className="gig_image"
            src={
              gig?.images && gig.images.length > 0
                ? gig.images[0]
                : "https://placehold.jp/30/ab1322/ffffff/300x150.png?text=EduCrat"
            }
            alt=""
          />
        </div>
        <div className="two-div">
          <div className="studend_avatar_container">
            <div>
              <img
                className="student_avatar"
                src={userData?.profileDetails?.profileURL}
                alt=""
              />
            </div>
            <div className="student_online_status"></div>
          </div>
          <div className="student_name">{userData?.username}</div>
        </div>
        <div className="one-div">
          <div className="course_price_wrapper">
            <div className="course_title">Current Price</div>
            <div className="course_amount">${gig?.pricing?.currentPrice}</div>
          </div>
        </div>
        <div className="course-status_wrapper ">
          <div className="course_status">Gig Title</div>
          {
            <div className="course_amount">
              {gig?.title && gig.title.slice(0, 40)}
              {gig?.title?.length > 9 && "..."}
            </div>
          }
        </div>
        <div className="view_wrapper">
          <Link className="view_button" to={"/tutor-gig/" + gig?._id}>
            <button>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardGig;
