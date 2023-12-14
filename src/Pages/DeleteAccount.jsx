import React, { useLayoutEffect, useState } from "react";

import "../Pages/signin.css";
import logo from "../assets/img/logo-choira.svg";
import google from "../assets/img/google.png";
import facebook from "../assets/img/facebook.png";
import apple from "../assets/img/apple.png";

import plane from "../assets/img/plane.gif";
import { IoClose } from "react-icons/io5";
import deleteAccountimg from "../assets/img/Delete Account.svg";

// import { useNavigate } from "react-router";
import SigninNum from "../components/signin/SigninNum";
import OptVerify from "../components/signin/OptVerify";
import DeleteAccountEmailVerify from "../components/signin/DeleteAccountEmailVerify";

function DeleteAccount() {
  const [deletepopup, setDeletepopup] = useState(false);
  const signin = true;

  const [mobileNumber, setMobileNumber] = useState("");

  // State to manage the sign-in steps
  const [deleteAccount, setDeleteAccount] = useState(1);

  // Function to handle mobile number input
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleContinueButtonClick = () => {
    // Check if the mobile number is not empty and has exactly 10 digits
    const trimmedMobileNumber = mobileNumber.trim();
    if (trimmedMobileNumber !== "" && trimmedMobileNumber.length === 10) {
      setDeleteAccount(2);
      // Perform any other actions as needed
    } else {
      // Display an error message or take appropriate action
      alert("Please enter a valid 10-digit mobile number.");
    }
  };
  const [countryCode, setCountryCode] = useState("91");
  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };
  let [deletecheckOtp, setDeleteCheckOtp] = useState(true);
  const check_otp_btn = () => {
    setDeleteCheckOtp(false);
  };
  // const gotoHome = () => {
  //   navigate("/home");
  // };
  const [deleteAccountEmail, setDeleteAccountEmail] = useState("");
  // const popuptab = () => {
  //   setDeleteAccount(3);
  // };
  const popuptab = () => {
    setDeletepopup(true);
  };
  const popuptabCancel = () => {
    setDeletepopup(false);
    // setTimeout(() => {
    //   gotoSignup();
    // }, 500);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (deleteAccount === 3 && deleteAccountEmail !== "") {
      popuptab();
    }
  };

  return (
    <>
      <div
        className={` delete-overlay-after ${
          deletepopup ? "delete-overlay" : ""
        }`}
      ></div>
      <div
        className={` delete-Popup ${deletepopup ? "delete-Popup-after" : ""}`}
      >
        <div className="cancelPopup">
          <IoClose style={{ cursor: "pointer" }} onClick={popuptabCancel} />
        </div>
        <div className="popupTitle">Account Deleted</div>
        <div className="popupDecription">
          <p>
            We have recieved your request to delete your account. <br />
            <br />
            Keep in mind that by deleting your account, all your <br /> data
            will be remove permanently.
          </p>
        </div>
        <div className="popupImg">
          <img src={plane} alt="" />
        </div>
        <div className="popupbtn">
          <button style={{ cursor: "pointer" }} onClick={popuptabCancel}>
            Ok
          </button>
        </div>
      </div>
      <div className="navbar">
        <img
          src={logo}
          alt="Choira Logo"
          style={{ cursor: "pointer" }}
          // onClick={gotoHome}
        />
      </div>

      <div className="wrapper">
        <form onSubmit={handelSubmit}>
          <div className="main">
            <div className="deleteAccount">
              <img src={deleteAccountimg} alt="deleteAccount" />
            </div>

            <div className="signup">
              <div className="signup-main">
                <div className="signup-main-2">
                  <div className="delete-header">
                    <div>
                      <h1>Delete Account</h1>
                    </div>
                  </div>
                  <div className="">
                    <h4 style={{ fontWeight: "300", marginTop: "-3%" }}>
                      Do you want to permanently delete your <br />
                      account ?
                    </h4>
                  </div>
                  <div className="enter-mob">
                    {deleteAccount == 1 ? (
                      <SigninNum
                        mobileNumber={mobileNumber}
                        handleMobileNumberChange={handleMobileNumberChange}
                        countryCode={countryCode} // Pass the country code to SigninNum
                        onCountryCodeChange={handleCountryCodeChange} // Pass the handler function
                      />
                    ) : deleteAccount == 2 ? (
                      <OptVerify
                        mobileNumber={mobileNumber}
                        countryCode={countryCode}
                        deletecheckOtp={deletecheckOtp}
                        setDeleteCheckOtp={setDeleteCheckOtp}
                        setDeletepopup={setDeletepopup}
                        setDeleteAccount={setDeleteAccount}
                      />
                    ) : (
                      <DeleteAccountEmailVerify
                        deleteAccountEmail={deleteAccountEmail}
                        setDeleteAccountEmail={setDeleteAccountEmail}
                      />
                    )}

                    <div className="footer">
                      <div
                        className={`${
                          deleteAccount === 1
                            ? "hr-line visiblity2"
                            : deleteAccount === 2
                            ? "visiblity"
                            : "hr-line visiblity2"
                        }`}
                      >
                        <div></div>
                        <small>OR</small>
                        <div></div>
                      </div>

                      <div
                        className={`${
                          deleteAccount === 1
                            ? "signin-option visiblity2"
                            : deleteAccount === 2
                            ? "visiblity"
                            : "signin-option visiblity2"
                        }`}
                      >
                        <div>
                          <img src={google} alt="Google" />
                          <small>Sign in with Google </small>
                        </div>
                        <div>
                          <img src={facebook} alt="Facebook" />
                        </div>
                        <div>
                          <img src={apple} alt="Apple" />
                        </div>
                      </div>
                      <div
                        className={`${
                          deleteAccount === 1
                            ? "continue"
                            : deleteAccount === 2
                            ? "verify-continue2 continue "
                            : " continue "
                        }`}
                      >
                        <div>
                          {deleteAccount === 2 && signin ? (
                            <button type="submit" onClick={check_otp_btn}>
                              submit
                            </button>
                          ) : deleteAccount === 3 && signin ? (
                            <button type="submit">submit</button>
                          ) : (
                            <button
                              type="submit"
                              onClick={handleContinueButtonClick}
                            >
                              continue
                            </button>
                          )}
                        </div>
                        <div>
                          <h6>
                            I understand that deleting my account will remove
                            all my data permanently.
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteAccount;
