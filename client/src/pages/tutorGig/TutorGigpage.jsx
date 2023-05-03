import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TutorGigPage.css";
import { Zoom, Navigation, Pagination } from "swiper";
import CardSwiper from "../../components/swiper/CardSwiper";
import axios from "axios";
import { backendURL } from "../../data/vars";
import AppUserContext from "../../context/AppUserContext";
import UserDetails from "../../components/profile/leftSide/userProfile/userDescription/UserDescription";

const TutorGigpage = () => {
  const { gigId } = useParams();
  const [gigDetails, setGigDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState(null);

  const navigate = useNavigate();
  const { appUser } = useContext(AppUserContext);

  const [res, setRes] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  const [overallRating, setOverallRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const messageBtnHandler = async (e) => {
    await axios
      .get(backendURL + "/api/alldetails/user/" + userDetails.userId)
      .then(async (res) => {
        console.log(res.data);
        await axios
          .post(backendURL + "/api/chat", {
            senderId: appUser._id,
            receiverId: res.data.user._id,
          })
          .then((res2) => {
            console.log(res2.data);
            navigate("/inbox?_id=" + res.data.user._id);
            // console.log();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkoutHandler = async (amount) => {
    console.log(window);

    const {
      data: {
        user: { _id },
      },
    } = await axios.get(
      backendURL + "/api/alldetails/user/" + userDetails.userId
    );

    const {
      data: { key },
    } = await axios.get(backendURL + "/api/getkey").catch((err) => {
      console.log(err);
    });

    const {
      data: { order },
    } = await axios
      .post(backendURL + "/api/checkout", {
        amount,
        user_id: appUser._id,
        userId: userDetails.userId,
        user_email: appUser.email,
        username: appUser.username,
        gigId: gigDetails._id,
        tutorId: gigDetails.userId,
      })
      .catch((err) => {
        console.log(err);
      });

    const options = {
      key,
      amount: order.amount,
      currency: "USD",
      name: gigDetails.title || "Buy Gig",
      description: gigDetails.subtitle || "Test Transaction",
      image:
        "https://res.cloudinary.com/educrat/image/upload/v1663691163/logo_icon_awcllg.png",
      order_id: order.id,
      callback_url:
        "http://localhost:8000/api/paymentverification?user_id=" +
        appUser._id +
        "&gigId=" +
        gigDetails._id +
        "&tutor_id=" +
        _id +
        "&gigPrice=" +
        gigDetails.pricing.currentPrice,
      prefill: {
        name: appUser.profileDetails.fname + " " + appUser.profileDetails.lname,
        email: appUser.email,
        // email: appUser.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ab1322",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (userDetails) {
      axios
        .get(backendURL + "/api/alldetails/user/" + userDetails.userId)
        .then(async (res) => {
          setRatingCount(0);
          setOverallRating(0);

          console.log(res.data.user._id + "   " + appUser._id);

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

          setShowBtn(res.data.user._id !== appUser._id);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(backendURL + "/api/feedbacks")
        .then((res) => {
          console.log(res.data.feedbacks);
          setAllFeedbacks(res.data.feedbacks);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDetails, appUser]);

  useEffect(() => {
    axios
      .get(backendURL + "/api/gig/" + gigId)
      .then((res) => {
        setGigDetails(res.data.gig);
        setUserDetails(res.data.user);
        setProfileDetails(res.data.profile);
        console.log(res.data);
      })
      .then(() => {
        axios.get(backendURL + "/api/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, [appUser]);

  return (
    <div className="tutor-gig-page">
      <div className="main-div-wrapper">
        <div className="first-div">
          <div className="gig-title">{gigDetails && gigDetails.title}</div>
          <div className="title-subheading">
            {gigDetails && gigDetails.subtitle}
          </div>
          <div className="tutor-info">
            <div className="tutor-info-container">
              <Link
                to={"/profile/" + userDetails?._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  className="tutor-avatar"
                  // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  src={profileDetails && profileDetails.profileURL}
                  alt=""
                />
                <div className="tutor-name">
                  {profileDetails && profileDetails.fname}{" "}
                  {profileDetails && profileDetails.lname}
                </div>
              </Link>
            </div>
            <div className="rating-wrapper">
              <img
                className="star-img"
                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-1024.png"
                alt=""
              />
              <div className="rating">{overallRating}</div>
              <div className="rating-no">({ratingCount} Rating)</div>
            </div>
          </div>
          <div className="swiper-div">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              zoom={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Zoom, Navigation, Pagination]}
              className="my-swiper"
            >
              {gigDetails &&
                gigDetails.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img src={image} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="desc-wrapper">
            <div className="desc-heading">Description</div>
            <div className="desc">{gigDetails && gigDetails.desc}</div>
          </div>
          <div className="learning-containers">
            <div className="desc-heading">
              What you will learn in this course
            </div>
            <div className="learning-container">
              {gigDetails &&
                gigDetails.learnings.map((title, index) => (
                  <div key={index} className="points">
                    <div className="feat-wrapper2">
                      <div className="featured-img">
                        <svg
                          className="feat-img1"
                          height="22"
                          width="22"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm5.707 8.707-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414Z"
                            fill="#1dbf73"
                            class="fill-232323"
                          ></path>
                        </svg>
                      </div>
                      <div className="feature">{title}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="target-wrapper">
            <div className="desc-heading">Who this course is for:</div>
            <div className="learning-container1">
              {gigDetails &&
                gigDetails.toWhom.map((title, index) => (
                  <div className="feat-wrapper1">
                    <div className="featured-img">
                      <svg
                        className="feat-img1"
                        height="20"
                        width="20"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m29.58 15.19-14-10A1 1 0 0 0 14 6v6.63L3.58 5.19A1 1 0 0 0 2 6v20a1 1 0 0 0 .54.89A1.07 1.07 0 0 0 3 27a1 1 0 0 0 .58-.19L14 19.37V26a1 1 0 0 0 .54.89A1.07 1.07 0 0 0 15 27a1 1 0 0 0 .58-.19l14-10a1 1 0 0 0 0-1.62Z"
                          data-name="Layer 2"
                          fill="#8969db"
                          class="fill-000000"
                        ></path>
                      </svg>
                    </div>
                    <div className="feature">{title}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="requ-container">
            <div className="desc-heading">Prerequisites for this Course:</div>
            <div className="learning-container1">
              {gigDetails &&
                gigDetails.prerequisites.map((title, index) => (
                  <div className="feat-wrapper1">
                    <div className="featured-img">
                      <svg
                        className="feat-img1"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="8"
                          fill="#f5494f"
                          class="fill-000000"
                        ></circle>
                        <path
                          data-name="<Transparent Rectangle>"
                          d="M0 0h32v32H0z"
                          fill="none"
                        ></path>
                      </svg>
                    </div>
                    <div className="feature">{title}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tutor-wrapper">
            <h1 className="desc-heading1">Course Tutor</h1>
            <div className="tutor-container">
              <div>
                <img
                  className="tut-img"
                  // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  src={profileDetails && profileDetails.profileURL}
                  alt=""
                ></img>
              </div>
              <div className="info-div">
                <div className="tut-desc">
                  {profileDetails && profileDetails.storyLine}
                </div>
                <div className="tutor-name1">
                  {profileDetails && profileDetails.fname}{" "}
                  {profileDetails && profileDetails.lname}
                </div>
                <div className="tut-desc">
                  {profileDetails && profileDetails.status}
                </div>
                <div className="detail-wrap">
                  <div className="rating-wrapper1">
                    <img
                      className="star-img"
                      src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-1024.png"
                      alt=""
                    />
                    <div className="rating">{overallRating}</div>
                    <div className="rating-no">({ratingCount} Rating)</div>
                  </div>
                  <div className="rating-wrapper1">
                    <img
                      className="star-img"
                      src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-people-1024.png"
                      alt=""
                    />
                    <div className="rating">
                      {userDetails?.gigBuyers && userDetails.gigBuyers.length}
                    </div>
                    <div className="rating-no">students</div>
                  </div>
                  <div className="rating-wrapper1">
                    <img
                      className="star-img"
                      src="https://cdn1.iconfinder.com/data/icons/camera-and-photography-3/64/Play-1024.png"
                      alt=""
                    />
                    <div className="rating">
                      {userDetails?.gigsInfo && userDetails.gigsInfo.length}
                    </div>
                    <div className="rating-no">courses</div>
                  </div>
                </div>
                <div className="tutor-title">
                  {/* Web Designer & Best-Selling Instructor */}
                  {profileDetails && profileDetails.desc}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="gig-comments-wrapper">
            <br />
            <div className="comment_heading">Reviews</div>
            <br />
            {allFeedbacks &&
              allFeedbacks.map((feedback, index) => {
                if (
                  feedback?.gigId?._id === gigDetails?._id &&
                  feedback.status === "completed"
                )
                  return (
                    <>
                      <div className="gig-comment-container">
                        <div className="gig_comment_wrapper">
                          <div className="gig-commenter-info">
                            <div className="commenter_details">
                              <div className="gig-commenter-image">
                                <Link to={"/profile/" + feedback.tuteeId._id}>
                                  <img
                                    className="avatar_img"
                                    width={30}
                                    src={feedback.tuteeId.profileImage}
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div className="gig-commenter-name">
                                <Link to={"/profile/" + feedback.tuteeId._id}>
                                  {feedback.tuteeId.username}
                                </Link>
                              </div>
                            </div>
                            <div className="gig-commenter-desc">
                              {feedback.studentFeedback}
                            </div>
                          </div>
                          <br />
                          <hr />
                        </div>
                      </div>
                    </>
                  );
              })}
          </div>
        </div>
        <div className="second-div">
          <div className="prizing">
            <div className="prize">
              <div className="selling-prize">
                $
                {(gigDetails &&
                  gigDetails.pricing &&
                  gigDetails.pricing.currentPrice) ||
                  "NA"}
              </div>
              <div className="actual-prize">
                $
                {(gigDetails &&
                  gigDetails.pricing &&
                  gigDetails.pricing.actualPrice) ||
                  "NA"}
              </div>
            </div>
            <div className="discount">
              {(gigDetails &&
                gigDetails.pricing &&
                gigDetails.pricing.discount) ||
                "NA"}
              % OFF
            </div>
          </div>
          {/* <hr></hr> */}
          <div className="prizing2">
            <div className="course-details">
              <svg
                height="18"
                width="18"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
              >
                <path
                  d="M24 0h8v32h-8zM12 8h8v24h-8zM0 16h8v16H0z"
                  fill="#6e7485"
                  class="fill-4e4e50"
                ></path>
              </svg>
              <div className="course-level">Course Level</div>
            </div>
            <div className="course-info">{gigDetails && gigDetails.level}</div>
          </div>
          {/* <div className="prizing1">
            <div className="course-details">
              <svg
                height="18"
                width="18"
                viewBox="0 0 48 48"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#6e7485" class="fill-241f20">
                  <path d="M16.601 18.578c.106 0 .21-.012.316-.016a12.869 12.869 0 0 1-.145-1.822c0-5.098 3-9.484 7.324-11.523C22.551 2.691 19.777 1 16.601 1a8.789 8.789 0 0 0 0 17.578z"></path>
                  <circle cx="29.476" cy="16.74" r="9.763"></circle>
                  <path d="M37.993 26.365a12.8 12.8 0 0 1-8.518 3.241c-3.256 0-6.22-1.219-8.487-3.212-5.913 3.227-9.953 9.7-9.953 17.165 0 1.176.105 2.323.297 3.44h36.37c.193-1.116.298-2.264.298-3.439 0-7.488-4.063-13.978-10.007-17.195zM19.162 24.205a12.782 12.782 0 0 1-1.542-2.881 11.528 11.528 0 0 1-8.661-2.844C3.637 21.385 0 27.213 0 33.934c0 1.058.095 2.092.267 3.098h9.062a19.718 19.718 0 0 1 9.833-12.827z"></path>
                </g>
              </svg>
              <div className="course-level">Students Enrolled</div>
            </div>
            <div className="course-info">1,019</div>
          </div> */}
          <div className="prizing1">
            <div className="course-details">
              <svg
                height="18"
                width="18"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 512 512"
              >
                <path
                  d="M6 246.6h127.3c.9-37.4 6.9-73.9 17.7-108.8-31.4-8.6-61.9-21.1-90.9-37.5C28 140.8 8 191.4 6 246.6zM133.3 265.4H6c2 55.2 22 105.8 54.1 146.2 28.9-16.4 59.5-28.9 90.9-37.5-10.8-34.7-16.9-71.3-17.7-108.7zM246.6 265.4h-94.4c.9 35.8 6.7 70.8 17.2 104.2 25.4-5.6 51.3-8.8 77.2-9.4v-94.8zM246.6 246.6v-94.8c-25.9-.6-51.8-3.8-77.2-9.4a375.08 375.08 0 0 0-17.2 104.2h94.4zM246.6 379.1c-23.8.6-47.6 3.4-71 8.5 16 43.1 39.9 83.1 71 118.3V379.1zM342.4 142.4c-25.3 5.6-51.1 8.7-77 9.3v94.8h94.2c-.8-35.1-6.6-70.2-17.2-104.1zM265.4 132.9c23.8-.6 47.5-3.4 70.8-8.4C320.5 82 296.9 41.8 265.4 6.2v126.7zM246.6 132.9V6.1c-31.1 35.2-55 75.2-71 118.3 23.3 5 47.1 7.9 71 8.5zM157 119.9c14.6-40.1 35.8-77.7 62.9-111.5-57.8 8.4-109.2 36.5-147.2 77.3 26.9 14.9 55.2 26.3 84.3 34.2zM157 392.1c-29.1 7.8-57.4 19.2-84.3 34.1 37.9 40.8 89.4 69 147.2 77.3-27.1-33.7-48.2-71.3-62.9-111.4zM265.4 379.1v126.8c31.5-35.6 55.1-75.8 70.8-118.3-23.3-5-47-7.9-70.8-8.5zM354.7 392.1c-14.4 39.6-35.3 77.3-62.7 111.5 57.8-8.4 109.3-36.5 147.2-77.3-26.9-15-55.3-26.4-84.5-34.2zM354.7 119.9c29.2-7.9 57.6-19.3 84.6-34.2-38-40.8-89.4-69-147.2-77.3 27.4 34.2 48.2 72 62.6 111.5zM265.4 265.4v94.8c25.8.6 51.6 3.7 77 9.3 10.6-33.9 16.4-69 17.3-104.2h-94.3zM506 265.4H378.6c-.9 36.7-6.8 73.3-17.8 108.7 31.5 8.6 62.1 21.1 91.1 37.5 32.1-40.4 52.1-91 54.1-146.2zM378.6 246.6H506c-2-55.2-22-105.8-54.1-146.2-29 16.4-59.6 29-91.1 37.5 10.9 35.3 16.9 71.9 17.8 108.7z"
                  fill="#6e7485"
                  class="fill-000000"
                ></path>
              </svg>
              <div className="course-level">Language</div>
            </div>
            <div className="course-info">
              {gigDetails && gigDetails.language}
            </div>
          </div>

          {!appUser?.gigBuyed?.some((e) => e.gig_id == gigId) && showBtn && (
            <div className="buy">
              <button
                type="button"
                onClick={() => {
                  checkoutHandler(gigDetails?.pricing?.currentPrice);
                }}
                className="buy-btn"
              >
                Buy Now
              </button>
            </div>
          )}

          {appUser?.gigBuyed?.some((e) => e.gig_id == gigId) && showBtn && (
            <div className="buy">
              <button type="button" className="buy-btn">
                Already Buyed
              </button>
            </div>
          )}

          {showBtn && (
            <div className="buy">
              <button onClick={messageBtnHandler} className="message-btn">
                Message
              </button>
            </div>
          )}
          <div className="features">
            <div className="feat-heading">This course includes:</div>
            <div className="feat-wrapper">
              <div className="feat-img">
                {" "}
                <svg
                  className="feat-img1"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none"></path>
                  <path
                    d="M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm4 28H14v-4h14v4zm6-8H14v-4h20v4zm0-8H14v-4h20v4z"
                    fill="#ff6636"
                    width="20"
                    height="20"
                    class="fill-000000"
                  ></path>
                </svg>
              </div>
              <div className="feature">
                Free exercises file & downloadable resources
              </div>
            </div>
            <div className="feat-wrapper">
              <div className="featured-img">
                <svg
                  height="22"
                  width="22"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64H447.9c.242-12.45.108-23.7-.156-33.02C447.3 13.63 433.2 0 415.8 0H160.2c-17.4 0-31.5 13.63-32 30.98-1.1 9.32-.4 20.57-.1 33.02H27.26c-11.1 0-20.723 7.59-23.348 18.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4 18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48 0 8.836 7.163 16 15.1 16h223.1c8.836 0 15.1-7.164 15.1-16 0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35 0-19.31 12.71-36.57 31.41-41.37 86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8c-27.94-41.2-30.4-84.1-29.03-107.8h80.39c5.359 59.62 20.35 131.1 57.67 189.1-49.04-19.5-85.54-46.7-109.03-81.3zm421.19 0c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39c.51 23.7-1.09 66.7-28.99 107.8z"
                    fill="#ff6636"
                    class="fill-000000"
                  ></path>
                </svg>
              </div>
              <div className="feature">certificate of completion</div>
            </div>
            <div className="feat-wrapper">
              <div className="featured-img1">
                {" "}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.41 148.02 232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
                    fill="#ff6636"
                    class="fill-000000"
                  ></path>
                </svg>
              </div>
              <div className="feature">
                Free exercises file & downloadable resources
              </div>
            </div>
          </div>
        </div>
      </div>
      {gigDetails && gigDetails.length > 0 && (
        <div className="rem-wrapper">
          <h1 className="desc-heading1">Related Courses</h1>
          <CardSwiper mode={"gig-keywords"} gigDetails={gigDetails} />
        </div>
      )}
    </div>
  );
};

export default TutorGigpage;
