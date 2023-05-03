import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppUserContext from "../../../context/AppUserContext";
import { backendURL } from "../../../data/vars";
import SearchBox from "../../searchbox/SearchBox";
import "./DefaultNavbar.css";

const DefaultNavbar = ({ isTutor, homepage }) => {
  const { appUser, setAppUser } = useContext(AppUserContext);
  const [toggleNav, setToggleNav] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const navigate = useNavigate();

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

  const onLogoutHandler = async () => {
    await localStorage.removeItem("accessToken");
    setAppUser(null);
    return navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left_side">
          <img src="/Images/logo/logo_icon.png" alt="" height={36} width={36} />
          <span className="name">EduCrat</span>
        </div>
        <div className="mid">
          <SearchBox />
        </div>
        <div className="right_side">
          {homepage && (
            <div className="login_signup_container">
              <Link to={"login"}>Sign In</Link>
              <Link className="join_btn" to={"signup"}>
                Join
              </Link>
            </div>
          )}
          {
            !homepage && <Link to={"/students-orders"}>
            <button>Orders</button>
          </Link>
          }
          {appUser && appUser.role === 0 && (
            <>
              <Link to={"/tutor-signup-questions"}>
                <button>Become a Tutor</button>
              </Link>
            </>
          )}
          {appUser && appUser.role === 1 && (
            <Link to={"/tutor-dashboard"}>
              <button>Switch to tutor</button>
            </Link>
          )}
          {!homepage && (
            <div className="logged-in-user-profile">
              {/* <button>
            <div>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
            </div>
          </button> */}
              <a href={"#"} onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <div className="avatar-wrapper">
                  <img
                    className="avatar-img"
                    alt=""
                    // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    src={profileImage ? profileImage : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
                  />
                  <div className="online"></div>
                </div>
              </a>

              <div className={showMediaIcons ? "toggle-div" : "toggle-div1"}>
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
                <div
                  className="toggle-subdiv"
                  onClick={() => setShowMediaIcons(false)}
                >
                  <Link className="toggle-element" to={"/tutor-dashboard"}>
                    Dashboard
                  </Link>
                </div>
                <div
                  className="toggle-subdiv"
                  onClick={() => setShowMediaIcons(false)}
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
            </div>
          )}
        </div>
        <div className="navbar_toggle">
          {!toggleNav ? (
            <button onClick={() => setToggleNav(true)}>
              <div className="hamburger" width={50} height={50}>
                <svg
                  viewBox="0 0 32 32"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 32 32"
                >
                  <path
                    d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z"
                    fill="#ffffff"
                    className="fill-000000"
                  ></path>
                </svg>
              </div>
            </button>
          ) : (
            <button onClick={() => setToggleNav(false)}>
              <div className="hamburger">
                <svg
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
                    fill="#ffffff"
                    fill-rule="evenodd"
                    className="fill-4a5568"
                  ></path>
                </svg>
              </div>
            </button>
          )}
        </div>
      </nav>
      <div className="nav_bottom_search_box">
        <SearchBox />
      </div>
      {toggleNav && (
        <div className="sidebar_container">
          <div className="side_bar side_bar_menu">
            {homepage && (
              <>
                <Link to={"/login"}>
                  <span>Sign in</span>
                </Link>

                <Link to={"/signup"}>
                  <button>Join</button>
                </Link>
              </>
            )}

            {appUser && appUser.role === 1 && (
              <Link to={"/signup-tutor"}>
                <span>Become a Tutor</span>
              </Link>
            )}
            <Link to={"/students-orders"}>
                <button>Orders</button>
              </Link>
            {appUser && appUser.role === 1 && (
              <>
                <Link to={"/profile/" + appUser?._id}>
                  <span>Profile</span>
                </Link>
                {appUser && appUser.role === 1 && (
                  <Link to={"/tutor-dashboard"}>
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={onLogoutHandler}
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                  }}
                >
                  <Link to={"/tutor-dashboard"}>
                    <span>Logout</span>
                  </Link>
                </button>
                <Link to={"/tutor-dashboard"}>
                  <span>Switch a Tutor</span>
                </Link>
              </>
            )}

            {/* <a href={"#"} onClick={() => setShowMediaIcons(!showMediaIcons)}> */}
            {!homepage && (
              <>
                <div className="avatar-wrapper">
                  <Link
                    className="toggle-element"
                    to={`/profile/${appUser ? appUser._id : ""}`}
                  >
                    <img
                      className="avatar-img"
                      alt=""
                      // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                      src={profileImage}
                    />
                    <div className="online"></div>
                  </Link>
                </div>
                <div>
                  <Link
                    className="toggle-element dash-link"
                    to={"/tutor-dashboard"}
                  >
                    Dashboard
                  </Link>
                </div>
                <div>
                  <Link
                    className="toggle-element dash-link1"
                    to={"#"}
                    onClick={onLogoutHandler}
                  >
                    Logout
                  </Link>
                </div>
                <div>
                  <Link to={"/tutor-signup-questions"}>
                    <button>Become a Tutor</button>
                  </Link>
                </div>

                <div className={showMediaIcons ? "toggle-div" : "toggle-div1"}>
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
                  {appUser && appUser.role === 1 && (
                    <div
                      className="toggle-subdiv"
                      onClick={() => setShowMediaIcons(false)}
                    >
                      <Link className="toggle-element" to={"/tutor-dashboard"}>
                        Dashboard
                      </Link>
                    </div>
                  )}
                  <div
                    className="toggle-subdiv"
                    onClick={() => setShowMediaIcons(false)}
                  >
                    <Link
                      className="toggle-element"
                      to={`/profile/${appUser ? appUser._id : ""}`}
                      onClick={onLogoutHandler}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultNavbar;
