import React, { useState, useEffect, useRef } from "react";

const OptVerify = ({
  mobileNumber,
  countryCode,
  deletecheckOtp,
  setDeleteCheckOtp,
  setDeleteAccount,
}) => {
  const [seconds, setSeconds] = useState(30);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    // Generate a random OTP when the component mounts
    generateOTP();

    // Start the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Set focus to the next input when enteredOTP changes
    if (enteredOTP.length < inputRefs.current.length) {
      inputRefs.current[enteredOTP.length].focus();
    }
  }, [enteredOTP]);

  const generateOTP = () => {
    const otp = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    console.log(otp);
    alert("your otp is " + otp);
    setGeneratedOTP(otp);
  };

  const restartTimer = () => {
    // Reset the timer to its initial value and generate a new OTP
    setSeconds(30);
    generateOTP();
  };

  const handleOTPChange = (index, value) => {
    // Handle OTP input change
    const newEnteredOTP = enteredOTP.split("");
    newEnteredOTP[index] = value;
    setEnteredOTP(newEnteredOTP.join(""));
  };

  const handleBackspace = (index) => {
    // Handle Backspace key
    if (index > 0) {
      const newEnteredOTP = enteredOTP.split("");
      newEnteredOTP[index - 1] = "";
      setEnteredOTP(newEnteredOTP.join(""));
      inputRefs.current[index - 1].focus();
    } else if (index === 0) {
      setEnteredOTP("");
    }
  };

  // this is for DeleteAccount page
  useEffect(() => {
    if (deletecheckOtp === false) {
      if (enteredOTP === generatedOTP) {
        console.log("OTP is correct. Redirect or perform another action.");
        alert("OTP is correct.");
        // setDeletepopup(true);

        setDeleteCheckOtp(false);
        setDeleteAccount(3);
      } else {
        console.log("Incorrect OTP. Please try again.");
        alert("Incorrect OTP. Please try again.");
        setDeleteCheckOtp(true);
      }
    }
  }, [deletecheckOtp]);

  return (
    <>
      <div className="enter-mob-inner-div2">
        <div className="verify2">
          <h4>Verify your mobile number</h4>
        </div>
        <div>
          <h6>
            Please enter the 4-digit verification code sent to
            <b>
              +{countryCode} {mobileNumber}
            </b>
          </h6>
        </div>
        <div className="verify2-input">
          {[...Array(4)].map((_, index) => (
            <input
              required
              key={index}
              type="text"
              maxLength="1"
              pattern="\d*"
              value={enteredOTP[index] || ""}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  handleBackspace(index);
                }
              }}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className="timer">
          {seconds > 0 ? (
            <h6>
              Expect code in <b> {seconds} seconds</b>
            </h6>
          ) : (
            <h6 onClick={restartTimer}>
              <span>Resend</span>
            </h6>
          )}
        </div>
      </div>
    </>
  );
};

export default OptVerify;
