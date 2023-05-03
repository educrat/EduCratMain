import React from "react";
import "./NewGig.css";
import { Link } from "react-router-dom";
 
const NewGig = () => {
  return (
    <div className="new_gig_container">
      <Link to={"/create-new-gig"}>
        <div className="add_icon_wrapper">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48H0z" fill="none"></path>
            <path
              d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
              fill="#6366f1"
              className="fill-000000"
            ></path>
          </svg>
        </div>
      </Link>
      <div className="add_title">Create a New Gig</div>
    </div>
  );
};
export default NewGig;
