import React from "react";
import "./GigPreview.css";
import { Link } from "react-router-dom";
import cards from "../../data/cards";

const GigPreview = ({ gigDetails, gigUsers }) => {
  return (
    <Link className="gig-preview" to={"/tutor-gig/" + gigDetails._id}>
      <img
        className="img-wrapper"
        src={
          (gigDetails.images && gigDetails.images[0]) ||
          "https://placehold.jp/350x300.png"
        }
        alt=""
      />
      <div className="avatar_wrapper1">
        <img
          className="avatar_img"
          alt=""
          // height={25}
          // width={25}
          src={
            gigUsers[gigDetails.userId].profileURL ||
            "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-256.png"
          }
        />
        <div className="avatar_name">
          {gigUsers[gigDetails.userId] && gigUsers[gigDetails.userId].fname}{" "}
          {gigUsers[gigDetails.userId] && gigUsers[gigDetails.userId].lname}
        </div>
      </div>
      <div className="course_wrapper">
        <div className="course_name">{gigDetails.language}</div>
        <div className="course_price">
          ${gigDetails.pricing && gigDetails.pricing.currentPrice}
        </div>
      </div>
      <div className="line-wrapper">
        <Link className="line-title" to={"/dashboard"}>
          {gigDetails.title.substring(0, 50)}{" "}
          {gigDetails.title.length >= 50 && "..."}
        </Link>
      </div>
      <div className="around_wrapper">
        <div className="rating-container">
          <div className="star_wrapper">
            <svg
              baseProfile="tiny"
              version="1.2"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.362 9.158-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19a.496.496 0 0 0 .734.534c1.844-1.048 4.606-2.624 4.606-2.624l4.604 2.625c.168.092.378.09.541-.029a.5.5 0 0 0 .195-.505l-1.071-5.191 3.919-3.566a.499.499 0 0 0-.28-.865c-2.108-.236-5.269-.586-5.269-.586l-2.183-4.83a.499.499 0 0 0-.909 0l-2.183 4.83z"
                fill="#fff000"
                className="fill-000000"
              ></path>
            </svg>
          </div>
          <div className="rating">5.0</div>
        </div>
        <div className="student-count">(2.1k)</div>
      </div>
    </Link>
  );
};

export default GigPreview;
