import React from "react";
import "./SignupPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupTutorPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function signupHandler() {
    alert("signup");
  }

  return (
    <div className="signup-container">
      <div className="left-container">
        <img src="/Images/logo/logo_icon.png" alt=""></img>
        <span className="company-name">EduCrat</span>
        <span className="company-tagline">Bridging the gap</span>
      </div>
      <div className="right-container">
        <div className="heading">Become a Tutor</div>
        <div>
          <form className="form-container">
            <div className="email-container">
              <label className="field-user-label">Username</label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                name="Username"
                className="field-user-input"
                type="text"
                placeholder="jhon_doe"
                required
              />
            </div>
            <div className="email-container">
              <label className="field-label">E-mail</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                name="email"
                className="field-input"
                type="email"
                placeholder="yourmail@gmail.com"
                required
              />
            </div>
            <div className="password-container">
              <label className="field-label">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="field-pass-input"
                type="password"
                name="psw"
                placeholder="*******"
                required
              />
              <div className="forgot-container">
                <input className="forgot-check" type="checkbox" />
                <span className="show-pass-wrapper">Show Password</span>
                {/* <Link className="forgot-pass-wrapper" to={"/signin"}>
                  Forgot Password
                </Link> */}
              </div>
            </div>
            <button
              onClick={signupHandler}
              type="button"
              className="signin-btn"
            >
              SIGNUP
            </button>
            <div>
              <span className="show-pass-wrapper">Already a User ?</span>
              <Link className="forgot-pass-wrapper" to={"/login"}>
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupTutorPage;
