import React, { useState } from "react";
import "../App.css";
import "./Login.css";

const Register = (props) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const meetsRequirements = (entries) => {
    // HTML handles email error checking
    if (entries.username.length < 5) {
      alert("Username too short");
      return false;
    }
    if (entries.password.length < 6 || !/\d/.test(entries.password)) {
      alert("Your password must be at least 6 characters in length and must contain a number");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    if (
      !meetsRequirements({
        username: userDetails.username,
        password: userDetails.password,
      })
    ) {
      return false;
    }
    try {
      await props.client.addUser(userDetails.username, userDetails.email, userDetails.password);
      alert("Account created successfully!");
    } catch (e) {
      alert("Something went wrong :(");
      throw e;
    }
  };

  const changeHandler = (event) => {
    // Updates states on input box change
    let fieldValue = event.target.value;
    let fieldName = event.target.name;
    const newState = { ...userDetails };
    newState[fieldName] = fieldValue;
    setUserDetails(newState);
  };

  return (
    <div className="sidenav">
      <img
        className="stannington-carnival-sidebar"
        style={{ width: "50%" }}
        src={require("../images/stannington.jpg")}
        alt={"event it logo"}
      />
      <div className="login-main-text">
        <span>
          <h2>CELEBRATING STANNINGTON</h2>
        </span>
        <h2>Register</h2>
        <div className="main">
          <div class="col-md-6 col-sm-12">
            <div className="login-form">
              <form onSubmit={(event) => submitHandler(event)}>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="username"
                    type="text"
                    value={userDetails.username}
                    placeholder="Username..."
                    onChange={(event) => changeHandler(event)}
                  ></input>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    placeholder="Email..."
                    onChange={(event) => changeHandler(event)}
                  ></input>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={userDetails.password}
                    placeholder="Password..."
                    onChange={(event) => changeHandler(event)}
                  ></input>
                </div>
                <button className="btn btn-secondary" type="submit">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
