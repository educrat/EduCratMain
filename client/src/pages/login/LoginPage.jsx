import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../../data/vars";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();

    if (password === "" || email === "") {
      alert("Email and password required!");
      return;
    }

    axios.post(backendURL + "/api/auth/signin", {
      email: email,
      password: password
    }, { withCredentials: true }
    ).then((res) => {
      if (res.status && res.status === "failed") {
        alert(res.message);
      }
      else {
        localStorage.setItem('accessToken', res.data.accessToken);
        // alert("Login sucess!");
        navigate('/dashboard');
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.status) {
        alert(error.response.data.message);
      } else {
        console.log(error && error.response);
      }
    })
  }

  return (
    <div className="login-container">
      <div className="right-container">
        <div className="heading">Welcome to EduCrat</div>
        <div>
          <form className="form-container" action="" onSubmit={loginHandler}>
            <div className="email-container">
              <label className="field-label">E-mail</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="field-input"
                type="email"
                placeholder="yourmail@gmail.com"
              />
            </div>
            <div className="password-container">
              <label className="field-label">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="field-pass-input"
                name="password"
                placeholder="*******"
              />
              <div className="forgot-container">
                <input className="forgot-check" type="checkbox" value={showPassword} onChange={(e) => setShowPassword(!showPassword)} />
                <span className="show-pass-wrapper">Show Password</span>
                <Link className="forgot-pass-wrapper" to={"/forgot-password"}>
                  Forgot Password
                </Link>
              </div>
            </div>
            <button type="submit" className="login-btn">LOGIN</button>
            <div>
              <span className="show-pass-wrapper">New here ?</span>
              <Link className="forgot-pass-wrapper" to={"/signup"}>
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
