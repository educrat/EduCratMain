import React from "react";
import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendURL, frontendURL } from "../../data/vars";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const signupHandler = () => {
    if (password === "" || email === "" || name === "") {
      alert("All fields are required!");
      return;
    }

    axios
      .post(backendURL + "/api/auth/signup", {
        username: name,
        password: password,
        email: email,
        fname: fname,
        lname: lname,
        role: 2,
      })
      .then((res) => {
        console.log(res.message);
        if (res.status && res.status === "failed") {
          alert(res.message);
          return;
        }
        alert("Signup sucesfully! Check Your email for verification!");
        navigate("/login");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.status
        ) {
          alert(error.response.data.message);
        } else {
          console.log(error && error.response);
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="right-container">
        <div className="heading">Sign-up to EduCrat</div>
        <div>
          <form className="form-container">
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
            <div className="email-container">
              <label className="field-user-label">First Name</label>
              <input
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                value={fname}
                name="fname"
                className="field-user-input"
                type="text"
                placeholder="jhon"
                required
              />
            </div>
            <div className="email-container">
              <label className="field-user-label">Last Name</label>
              <input
                onChange={(e) => {
                  setLName(e.target.value);
                }}
                value={lname}
                name="lname"
                className="field-user-input"
                type="text"
                placeholder="doe"
                required
              />
            </div>
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
            <div className="password-container">
              <label className="field-label">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="field-pass-input"
                type={showPassword ? "text" : "password"}
                name="psw"
                placeholder="*******"
                required
              />
              <div className="forgot-container">
                <input
                  className="forgot-check"
                  type="checkbox"
                  onClick={(e) => setShowPassword(!showPassword)}
                />
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

export default SignupPage;
