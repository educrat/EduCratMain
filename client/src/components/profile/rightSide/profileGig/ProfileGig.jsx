import React, { useContext } from "react";
import "./ProfileGig.css";
import { Link } from "react-router-dom";
import AppUserContext from "../../../../context/AppUserContext";
import axios from "axios";
import { backendURL } from "../../../../data/vars";

const ProfileGig = ({
  gigDetails,
  userData,
  paramsUser,
  deletedItem,
  setDeletedItem,
}) => {
  const { appUser } = useContext(AppUserContext);

  // const editBtnHandler = (e) => {

  //   alert("Edit Button Clicked");
  // }

  const deleteBtnHandler = async (e) => {
    e.preventDefault();
    alert("Delete Button Clicked");

    await axios
      .post(backendURL + "/api/delete/gig/", {
        gig_id: gigDetails._id,
        user_id: appUser._id,
      })
      .then((res) => {
        console.log(res);
        alert("Gig Deleted Successfully");
        setDeletedItem(deletedItem + 1);
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting gig");
      });
  };

  return (
    <div className="profile_gig_container">
      {/* {
        paramsUser.userId === userData.userId && <div> {userData.userId} <br /> You are a owner</div>
      } */}
      <div className=" profile_gig_wrapper">
        {paramsUser.userId === userData.userId && (
          <div className="btns">
            <Link to={"/create-new-gig?gig_id=" + gigDetails?._id}>
              <button
                type="button"
                style={{ background: "none", outline: "none", border: "none" }}
              >
                <img
                  className="edit-btn"
                  src="https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/pencil-1024.png"
                  alt=""
                />
              </button>
            </Link>
            {/* <button type="button" onClick={deleteBtnHandler} style={{ background: "none", outline: "none", border: "none" }}>
              <img className="delete-btn" src="https://cdn0.iconfinder.com/data/icons/mixed-18/65/12-1024.png" alt="" />
            </button> */}
          </div>
        )}
        <img
          className="gig_image"
          src={
            (gigDetails && gigDetails.images[0]) ||
            "https://placehold.jp/1000x250.png"
          }
          alt=""
        />
        <div className="tagline_container">
          {`${gigDetails && gigDetails.desc}`.slice(0, 50) + "..."}
        </div>
        <div className="price_container">
          <div className="price_btn">
            <Link to={`/profile/${appUser ? appUser._id : ""}`}>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    fill="#858585"
                    className="fill-4a5568"
                  ></path>
                </svg>
              </div>
            </Link>
          </div>
          <div className="price_wrapper">
            <div className="price_title">STARTING AT &nbsp;</div>
            <div className="price_value">
              {" "}
              ${" "}
              {(gigDetails &&
                gigDetails.pricing &&
                gigDetails.pricing.actualPrice) ||
                "NA"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGig;
