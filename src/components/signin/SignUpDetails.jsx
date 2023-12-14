import React, { useEffect, useState } from "react";

function SignUpDetails(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  // let takeData = props.sendData;
  const [wrongDetails, setWrongDetails] = useState(true);
  useEffect(() => {
    if (props.sendData == true) {
      if (email === "sonu@gmail.com") {
        alert("This email is already present");
        props.setSendData(false);

        setWrongDetails(false);
      } else {
        alert("Form submitted");
      }
    }
  }, [email, props.sendData, props.setSendData]);

  return (
    <>
      <div className="enter-mob-inner-div3">
        <div className="input-title">
          <div>
            <h5>Enter your Full Name</h5>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-title">
          <div>
            {wrongDetails ? (
              <h5>Enter your Email Id</h5>
            ) : (
              <h5 style={{ color: "red" }}> Email Id is alredy present</h5>
            )}
          </div>
          <div>
            <input
              className={`${wrongDetails ? "" : "wrong-details"}`}
              type="email"
              name="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-title">
          <div>
            <h5>Date of Birth</h5>
          </div>
          <div className="date-input">
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="DD/MM/YYYY"
            />
            {/* <input style={{ display: "none" }} type="date" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpDetails;
