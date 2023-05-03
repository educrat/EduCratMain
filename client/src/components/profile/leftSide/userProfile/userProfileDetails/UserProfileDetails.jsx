import React, { useState, useEffect, useContext } from "react";
import "./UserProfileDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../../../../data/vars";
import AppUserContext from "../../../../../context/AppUserContext";

const UserProfileDetails = ({ userData, paramsUser }) => {
  const [image, setImage] = useState();
  const { appUser } = useContext(AppUserContext);
  const [userDetails, setUserDetails] = useState(userData);
  const [renderImage, setRenderImage] = useState(
    userDetails &&
      userDetails.profileDetails &&
      userDetails.profileDetails.profileURL
  );
  const [hidePreview, setHidePreview] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const onImgUpload = async (e) => {
    await setImage(e.target.files[0]);
    setRenderImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (paramsUser) {
      axios
        .get(backendURL + "/api/user/" + paramsUser._id)
        .then((res) => {
          // console.log(res.data.user);
          setUserDetails(res.data.user);
          setRenderImage(res.data.user.profileDetails.profileURL);
        })
        .catch((err) => console.log(err));
    }
  }, [paramsUser, userData, appUser]);

  useEffect(() => {
    if (appUser) {
      axios
        .get(backendURL + "/api/user/" + appUser._id)
        .then((res) => {
          setRatingCount(0);
          setOverallRating(0);

          console.log(res.data.user);

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
    <div className="user_profile_details_wrapper ">
      {userData?._id === paramsUser?._id && (
        <div className="profile-edit-btn-wrapper">
          <Link to={"/tutor-signup-questions"}>
            <button className="profile-edit-btn">{"Edit"}</button>
          </Link>
        </div>
      )}
      <div className="name_rating">
        <div className="avatar_container">
          {/* <div className="avatar_wrapper">
            <img
              className="profile_avatar_img"
              alt=""
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            />
            <div className="online_status"></div>
          </div> */}
          <div className="avatar-upload-div">
            <div
              onChange={(e) => hidePreview(e)}
              className="upload-image image_upload_wrapper"
            >
              {renderImage ? (
                <div className="file-upload-preview">
                  <img
                    className="avatar-img"
                    id={`file-ip-${image}-preview`}
                    src={renderImage}
                    alt=""
                  />
                </div>
              ) : (
                <div className="file-upload-preview">
                  <img
                    className="avatar-img"
                    id={`file-ip-${image}-preview`}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
            {/* <div className=" image_upload_wrapper">
              <label for={`file-ip-${image}`}>
                <img
                  className="upload-btn"
                  src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-17-1024.png"
                  alt=""
                />
              </label>
              <input
                type="file"
                id={`file-ip-${image}`}
                accept="image/*"
                onChange={(e) => onImgUpload(e)}
              />
            </div> */}
          </div>
          <div className="name_wrapper">
            <div className="avatar_name">
              {userDetails &&
                userDetails.profileDetails &&
                userDetails.profileDetails.fname}{" "}
              {userDetails &&
                userDetails.profileDetails &&
                userDetails.profileDetails.lname}
            </div>
            <div className="star_rate">
              <div className="star_rating">
                <img
                  width={26}
                  height={26}
                  src="https://cdn1.iconfinder.com/data/icons/multimedia-and-interface-flat-style-1/32/Multimedia_Favorite_star_interface-1024.png"
                  alt=""
                ></img>
              </div>
              <span className="actual_rating">
                {Number.parseFloat(overallRating) /
                  Number.parseFloat(ratingCount)}{" "}
                ({ratingCount})
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="user-status">
        {userDetails &&
          userDetails.profileDetails &&
          userDetails.profileDetails.status}
      </div>
      {/* <Link className="preview_profile_btn" to={"/profile"}>
        <button>Preview Fiverr Profile</button>
      </Link> */}
      <hr />
      <div className="more_details">
        <div className="details_container">
          <div className="icon_wrapper">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                fill="#62646a"
                className="fill-000000"
              ></path>
              <path d="M0 0h48v48H0z" fill="none"></path>
            </svg>
          </div>
          <div className="title_wrapper">From</div>
        </div>
        <div className="value_wrapper">
          {userDetails &&
            userDetails.profileDetails &&
            userDetails.profileDetails.country}
        </div>
      </div>
      <div className="more_details">
        <div className="details_container">
          <div className="icon_wrapper">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="12"
                cy="8"
                fill="#64626a"
                r="4"
                className="fill-464646"
              ></circle>
              <path
                d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6Z"
                fill="#64626a"
                className="fill-464646"
              ></path>
            </svg>
          </div>
          <div className="title_wrapper">Member since</div>
        </div>
        <div className="value_wrapper">
          {userDetails &&
            userDetails.profileDetails &&
            userDetails.profileDetails.memberSince}
        </div>
      </div>
      <div className="more_details">
        <div className="details_container">
          <div className="icon_wrapper">
            <svg
              viewBox="0 0 64 64"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 64 64"
            >
              <path
                d="M-346.1-373.1c-12.6 0-22.9-10.3-22.9-22.9 0-12.6 10.3-22.9 22.9-22.9 12.6 0 22.9 10.3 22.9 22.9.1 12.6-10.2 22.9-22.9 22.9zm0-43.4c-11.3 0-20.4 9.2-20.4 20.4s9.2 20.4 20.4 20.4 20.4-9.2 20.4-20.4-9.1-20.4-20.4-20.4z"
                transform="translate(378 428)"
                fill="#62646a"
                className="fill-134563"
              ></path>
              <path
                d="m-338.9-384.3-8.5-8.5v-15.5h2.7v14.4l7.7 7.7-1.9 1.9"
                transform="translate(378 428)"
                fill="#62646a"
                className="fill-134563"
              ></path>
            </svg>
          </div>
          <div className="title_wrapper">Avg. Response Time</div>
        </div>
        <div className="value_wrapper">1 hour</div>
      </div>
      {/* <div className="more_details">
        <div className="details_container">
          <div className="icon_wrapper">
            <svg
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 512 512"
            >
              <path
                d="M448.9 64H416v40.7c0 22.5-23.2 39.3-47.2 39.3S320 127.2 320 104.7V64H192v40.7c0 22.5-24 39.3-48 39.3s-48-16.8-48-39.3V64H63.1C45.9 64 32 77.3 32 93.4v357.5C32 467 45.9 480 63.1 480h385.8c17.2 0 31.1-13 31.1-29.2V93.4c0-16.1-13.9-29.4-31.1-29.4zM432 419.9c0 6.6-5.8 12-12.8 12l-326.5.1c-7-.3-12.7-5.6-12.7-12.2V188.3c0-6.9 5.9-12.3 13.3-12.3h325.5c7.3 0 13.2 5.3 13.2 12.1v231.8z"
                fill="#62646a"
                className="fill-000000"
              ></path>
              <path
                d="M176 96c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v32zM400 96c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v32z"
                fill="#62646a"
                className="fill-000000"
              ></path>
            </svg>
          </div>
          <div className="title_wrapper">Available</div>
        </div>
        <Link className="available_profile_btn" to={"/profile"}>
          <button>Set Availability</button>
        </Link>
      </div> */}
    </div>
  );
};

export default UserProfileDetails;
