import React, { useContext, useEffect, useState } from "react";
import UserDetails from "../../components/profile/leftSide/userProfile/userDescription/UserDescription";
import UserProfileDetails from "../../components/profile/leftSide/userProfile/userProfileDetails/UserProfileDetails";
import NewGig from "../../components/profile/rightSide/addNewGig/NewGig";
import ProfileGig from "../../components/profile/rightSide/profileGig/ProfileGig";
import "./ProfilePage.css";
import { backendURL } from "../../data/vars";
import AppUserContext from "../../context/AppUserContext";
import axios from "axios";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ProfilePage = ({ type }) => {
  const { appUser } = useContext(AppUserContext);
  const [userData, setUserData] = useState("");
  const [paramsUser, setParamsUser] = useState("");
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSelf, setIsSelf] = useState(false);
  const [deletedItem, setDeletedItem] = useState(0);

  useEffect(() => {
    if (appUser) {
      axios
        .get(backendURL + "/api/user/" + appUser._id)
        .then((res) => {
          console.log(res.data.user);
          setUserData(res.data.user);
        })
        .catch((err) => console.log(err));
    }

    axios
      .get(backendURL + "/api/feedbacks")
      .then((res) => {
        console.log(res.data.feedbacks);
        setAllFeedbacks(res.data.feedbacks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appUser]);

  useEffect(() => {
    if (id) {
      axios
        .get(backendURL + "/api/user/" + id)
        .then((res) => {
          if (!res.data.user) {
            return alert("User not found");
          }
          console.log(res.data.user);
          setParamsUser(res.data.user);
          if (res.data.user._id === appUser._id) {
            setIsSelf(true);
          }
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
        .catch((error) => {
          if (error.response.status === 500) {
            alert("User not found!");
          } else {
            console.log(error.message);
          }
        })
        .finally(() => {
          // navigate('/');
        });
    } else {
      navigate("/dashboard");
    }
  }, [id, deletedItem]);

  return (
    <div className="profile_page">
      <div className="dashboard_container page_container">
        <div className="left_side">
          <UserProfileDetails
            paramsUser={paramsUser}
            ratingCount={ratingCount}
            overallRating={overallRating}
            userData={userData}
          />
          <UserDetails paramsUser={paramsUser} userData={userData} />
        </div>
        <div className="right-side-container">
          <div className="right_side">
            {paramsUser?.gigsInfo && paramsUser.gigsInfo.length > 0 ? (
              <div className="gig_title">All Gigs:</div>
            ) : (
              <div className="gig_title">No gigs Available</div>
            )}
            <div className="gig_container">
              {appUser?._id === paramsUser?._id && appUser?.role === 1 && (
                <NewGig />
              )}
              {paramsUser &&
                paramsUser.gigsInfo.map((gig, index) => (
                  <Link to={"/tutor-gig/" + gig._id}>
                    <ProfileGig
                      deletedItem={deletedItem}
                      setDeletedItem={setDeletedItem}
                      paramsUser={paramsUser}
                      userData={userData}
                      key={index}
                      gigDetails={gig}
                    />
                  </Link>
                ))}
              {/* {
                userData && userData.gigsInfo && userData.gigsInfo.length === 0 && <div className="gig_title">No Gigs Available</div>
              } */}
            </div>
          </div>
          {/* <br /> */}
          {appUser?.role === 1 && id === appUser?._id && (
            <div className="gig_comments_container">
              <br />
              <div className="review_head">Reviews: </div>
              <br />
              <div className="gig_comments_wrapper">
                {allFeedbacks.map((feedback, index) => {
                  if (
                    feedback?.tutorId?._id === appUser?._id &&
                    feedback?.studentFeedback !== ""
                  )
                    return (
                      <>
                        <div className="review_container">
                          {/* student section */}

                          <div className="review_section">
                            <div className="review_wrapper">
                              {/* <div className="review_heading">
                              Reviews as Tutee
                            </div> */}
                              <div className="review_details">
                                <Link to={"/profile/" + feedback.tuteeId._id}>
                                  <img
                                    className="review_avatar"
                                    width={26}
                                    src={feedback.tuteeId.profileImage}
                                    alt=""
                                  />
                                </Link>
                                <Link
                                  className="review_username"
                                  to={"/profile/" + feedback.tuteeId._id}
                                >
                                  {feedback.tuteeId.username}
                                </Link>
                              </div>
                              <div className="feedback">
                                {feedback.studentFeedback}
                              </div>
                              <br />
                              <div className="review_details">
                                <Link to={"/profile/" + feedback.tutorId._id}>
                                  <img
                                    className="review_avatar"
                                    width={26}
                                    src={feedback.tutorId.profileImage}
                                    alt=""
                                  />
                                </Link>
                                <br />
                                <Link
                                  className="review_username"
                                  to={"/profile/" + feedback.tutorId._id}
                                >
                                  {feedback.tutorId.username}
                                </Link>
                              </div>
                              <div className="feedback">
                                {feedback.teacherFeedback}
                              </div>
                              <br />
                              <hr />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
