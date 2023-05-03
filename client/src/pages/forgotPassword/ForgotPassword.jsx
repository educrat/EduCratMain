import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { backendURL } from '../../data/vars';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgetPasswordHandler = () => {

    if (!email) {
      return alert("EMail required")
    } else {

      localStorage.removeItem('accessToken');

      axios.post(backendURL + "/api/forget-password", {
        email: email
      }).then(res => {
        alert(res.data.message);
      }).catch(err => alert(err.message));
    }
  }

  return (
    <div className="reset-password-container">
      {/* <div className="left-container">
        <img src="/Images/logo/logo_icon.png" alt=""></img>
        <span className="company-name">EduCrat</span>
        <span className="company-tagline">Bridging the gap</span>
      </div> */}
      <div className="right-container">
        <div className="heading-container">
          <div className="heading">Forgot Your Password?</div>
          <span className="heading-text">
            We get it, stuff happens. Just enter your email address below and
            we'll send you a link to reset your password!
          </span>
        </div>
        <div>
          <form className="form-container" action="">
            <div className="email-container">
              <label className="field-label">E-mail</label>
              <input
                type={"email"}
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourmail@gmail.com"
              />
            </div>
            <button onClick={forgetPasswordHandler} type="button" className="reset-password-btn">
              RESET PASSWORD
            </button>
            <div>
              <span className="show-pass-wrapper">New here ?</span>
              <Link className="forgot-pass-wrapper" to={"/signup"}>
                Create an Account
              </Link>
              <div className="already-user-container">
                <span className="show-pass-wrapper">Already a User ?</span>
                <Link className="forgot-pass-wrapper" to={"/login"}>
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
