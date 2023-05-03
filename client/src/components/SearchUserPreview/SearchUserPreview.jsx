import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppUserContext from "../../context/AppUserContext";
import { backendURL } from "../../data/vars";
import "./SearchUserPreview.css";

const SearchUserPreview = ({ userDetails, query }) => {
  const { appUser } = useContext(AppUserContext);

  const navigate = useNavigate();

  const messageBtnHandler = async (e) => {
    await axios
      .get(backendURL + "/api/alldetails/user/" + userDetails.userId)
      .then(async (res) => {
        await axios
          .post(backendURL + "/api/chat", {
            senderId: appUser._id,
            receiverId: res.data.user._id,
          })
          .then(() => {
            navigate("/inbox?_id=" + res.data.user._id);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Link to={"/search?q=" + query} className="gig-preview-link">
      <div className="search-user">
        <img
          className="avatar"
          // src="https://res.cloudinary.com/educrat/image/upload/v1662622441/irqxjhwkz29ptobtgjum.jpg"
          src={
            userDetails?.profileDetails?.profileURL
              ? userDetails.profileDetails.profileURL
              : "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-256.png"
          }
          alt=""
        />
        <div className="tutor-username">
          {userDetails?.username ? "@" + userDetails.username : ""}
        </div>
        <div className="user-name">
          {userDetails?.profileDetails?.fname &&
            userDetails.profileDetails.fname}{" "}
          {userDetails?.profileDetails?.lname &&
            userDetails.profileDetails.lname}
        </div>
        <button
          className="message-btn"
          type="button"
          onClick={messageBtnHandler}
        >
          Message
        </button>
      </div>
    </Link>
  );
};

export default SearchUserPreview;
