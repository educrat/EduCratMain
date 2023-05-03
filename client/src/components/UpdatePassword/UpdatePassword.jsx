import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../../data/vars";
import { Link } from "react-router-dom";
import './UpdatePassword.css'

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const navigate = useNavigate();

  let { userId } = useParams();

  const updatePasswordHandler = async () => {
    if (password && reEnterPassword) {
      if (password !== reEnterPassword) {
        alert("Re-entered password didn't match!");
      } else {
        await axios
          .post(backendURL + "/api/update-password", {
            userId: userId,
            password: password,
            cpassword: reEnterPassword,
          })
          .then((res) => {
            alert(res.data.message);
          })
          .then(() => {
            navigate("/login");
          })
          .catch((err) => alert(err.message));
      }
    } else {
      alert("Both fields are required!");
    }
  };

  return (
    <div className="update-password-page">
      <div className="right-container">
        <div className="heading">Create New Password</div>
        <span className="heading-text">
          Your new password must be different from your previously used password. 
        </span>
        <div>
          <form className="form-container">
          <div className="password-container">
              <label className="field-label">Password</label>
              <input
              type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                className="field-pass-input"
                name="psw"
                placeholder="Enter new password "
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
            <div className="password-container">
              <label className="field-label">Confirm Password</label>
              <input
              type="text" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)}
                className="field-pass-input"
                name="psw"
                placeholder="confirm your password"
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
              type="button"
              onClick={updatePasswordHandler}
              className="signin-btn"
            >
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

export default UpdatePassword;
