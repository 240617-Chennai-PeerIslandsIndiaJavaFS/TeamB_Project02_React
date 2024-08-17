import React, { useState } from "react";
import axios from "axios";
import logopassword from "../media/passwordreset.png";
import "../css/PasswordReset.css";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    axios
      .get("http://localhost:8080/api/resetPassword", {
        params: {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
      })
      .then((response) => {
        console.log("Password reset response:", response.data);
        alert("Password updated successfully!");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("There was an error resetting the password!", error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("There was an error resetting the password!");
        }
      });
  };

  return (
    <div className="passwordreset">
      <button className="go-back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
      <div className="flex-container-pw">
        <img src={logopassword} alt="Logo" className="logo-pw" />
        <div className="pw-container">
          <h1 className="h1styles">Let's Reset Your Password</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label-pw">
                Email Address
              </label>
              <input
                type="email"
                className="form-control-pw"
                id="exampleInputEmail1"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputOldPassword1"
                className="form-label-pw"
              >
                Old Password
              </label>
              <input
                type="password"
                className="form-control-pw"
                id="exampleInputOldPassword1"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputNewPassword1"
                className="form-label-pw"
              >
                New Password
              </label>
              <input
                type="password"
                className="form-control-pw"
                id="exampleInputNewPassword1"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputConfirmPassword1"
                className="form-label-pw"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control-pw"
                id="exampleInputConfirmPassword1"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="button-container-pw">
              <button type="submit" className="btn reset-button">
                Reset Password
              </button>
            </div>
          </form>
          <div id="message"></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
