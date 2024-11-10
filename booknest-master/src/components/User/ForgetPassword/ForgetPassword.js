// ForgetPassword.js

import { useState, useRef } from "react";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header.js";
import axios from "../../../Interceptor.js";
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import { ToastContainer, toast } from "react-toastify";

function ForgetPassword() {
  const navigate = useNavigate();
  const email = useRef(null);
  const OTP = useRef(null);
  const newPassword = useRef(null);
  const confirmPassword = useRef(null);
  const [otpStatus, setOtpStatus] = useState(false);

  const handleRequestOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiEndPoint.USER_CHECK, {
        email: email.current.value,
      });
      if (response.data.status) {
        setOtpStatus(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(response.data.message || "This user is unauthorized...");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword.current.value !== confirmPassword.current.value) {
      return toast.error("Passwords do not match.");
    }
    try {
      const response = await axios.post(apiEndPoint.UPDATE_PASSWORD, {
        email: email.current.value,
        otp: OTP.current.value,
        password: newPassword.current.value,
      });
      if (response.data.status) {
        toast.success("Password updated successfully.");
        navigate("/signin");
      } else {
        toast.error(response.data.message || "Error updating password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Invalid OTP or expired OTP. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container">
        <div className="row m-auto">
          <div className="col-md-4 col-md-offset-4 m-auto forgetpassword mt-5">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3 className="mt-3">
                    <i className="fa fa-lock fa-4x lock" />
                  </h3>
                  <h2 className="text-center changepasswordHeading">
                    Forgot Password?
                  </h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    <form
                      onSubmit={
                        otpStatus ? handleResetPassword : handleRequestOTP
                      }
                    >
                      <div className="form-group">
                        <input
                          ref={email}
                          placeholder="Please Enter Email"
                          className="form-control"
                          type="email"
                          required
                        />
                      </div>
                      {otpStatus && (
                        <>
                          <div className="form-group">
                            <input
                              ref={OTP}
                              placeholder="Enter OTP"
                              className="form-control"
                              type="number"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              ref={newPassword}
                              placeholder="New Password"
                              className="form-control"
                              type="password"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              ref={confirmPassword}
                              placeholder="Confirm Password"
                              className="form-control"
                              type="password"
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        type="submit"
                        className="btn btn-lg cartbutton btn-block"
                      >
                        {otpStatus ? "Reset Password" : "Send OTP"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
