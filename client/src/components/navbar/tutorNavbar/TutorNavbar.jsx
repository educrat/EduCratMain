import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TutorNavbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import AppUserContext from "../../../context/AppUserContext";
import axios from "axios";
import { backendURL } from "../../../data/vars";

const TutorNavbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showProfileOptions, seProfileOptions] = useState(false);
  const navigate = useNavigate();
  const { appUser, setAppUser } = useContext(AppUserContext);
  const [profileImage, setProfileImage] = useState(null);

  const onLogoutHandler = async () => {
    await localStorage.removeItem("accessToken");
    setAppUser(null);
    return navigate("/");
  };

  useEffect(() => {
    if (appUser) {
      axios
        .get(backendURL + "/api/alldetails/user/" + appUser.userId)
        .then((res) => {
          console.log(res);
          setProfileImage(res.data.profile.profileURL);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [appUser]);

  return (
    <>
      <nav className="main-nav">
        {/* Hamburger start */}
        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu style={{ color: "white", size: "50px" }} />{" "}
          </a>
        </div>
        {/* first div */}
        <div className="logo">
          <img src="/Images/logo/logo_icon.png" alt="" height={36} width={36} />
          <span className="logo-title">EduCrat</span>
        </div>
        {/* second div */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
             <li>
              <Link
                className="sub-link"
                onClick={() => setShowMediaIcons(false)}
                to={"/tutor-dashboard"}
              >
                Dashboard
              </Link>
            </li> 
            <li>
              <Link
                className="sub-link"
                onClick={() => setShowMediaIcons(false)}
                to={"/inbox"}
              >
                Messages
              </Link>
            </li>
            <li>
              <Link
                className="sub-link"
                onClick={() => setShowMediaIcons(false)}
                to={"/tutor-orders"}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className="sub-link"
                onClick={() => setShowMediaIcons(false)}
                to={"/tutor-earnings"}
              >
                Earnings
              </Link>
            </li>
          </ul>
        </div>
        {/* thrid div */}
        <div className="social-media">
          <ul className="social-deskstop ">
            <li>
              <Link
                className="switch-link mobile-switch-link"
                to={"/dashboard"}
              >
                Switch to Tutee
              </Link>
            </li>
            <li style={{ position: "relative" }}>
              <a
                href={"#"}
                style={{ position: "relative" }}
                onClick={() => seProfileOptions(!showProfileOptions)}
              >
                <div className="avatar-wrapper">
                  <img
                    className="avatar-img"
                    alt=""
                    // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    src={profileImage}
                  />
                  <div className="online"></div>
                </div>
              </a>

              <div
                className={showProfileOptions ? "toggle-div" : "toggle-div1"}
              >
                <div
                  className="toggle-subdiv"
                  onClick={() => setShowMediaIcons(false)}
                >
                  <Link
                    className="toggle-element"
                    to={`/profile/${appUser ? appUser._id : ""}`}
                  >
                    Profile
                  </Link>
                </div>
                {/* <div
                  className="toggle-subdiv"
                  onClick={() => setShowMediaIcons(false)}
                >
                  <Link className="toggle-element" to={"/tutor-dashboard"}>
                    Dashboard
                  </Link>
                </div> */}
                <div
                  className="toggle-subdiv"
                  onClick={() => seProfileOptions(false)}
                >
                  <Link
                    className="toggle-element"
                    to={"#"}
                    onClick={onLogoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default TutorNavbar;
