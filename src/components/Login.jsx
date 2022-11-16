import React, { useState } from "react";
import "../App.css";
import "./Login.css";

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    // Updates states on input box change
    let fieldValue = event.target.value;
    let fieldName = event.target.name;
    const newState = { ...userDetails };
    newState[fieldName] = fieldValue;
    setUserDetails(newState);
  };

  const submitHandler = async (event) => {
    // Choose what to do on submit
    console.log(userDetails);
    event.preventDefault(); // Prevent page refreshing
    try {
      const res = await props.client.login(userDetails.username, userDetails.password);
      props.loggedIn(res.data.token);
      console.log(`success: ${res.data.token}`);
    } catch (error) {
      alert("Incorrect details");
      throw error;
    }
  };

  return (
    <div className="sidenav">
      <div className="login-main-text">
        <span>
          <h2>CELEBRATING STANNINGTON</h2>
        </span>
        <p>Login or register from here to access bookings.</p>
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
                <button type="submit" className="btn btn-black">
                  Login
                </button>
                <button type="submit" class="btn btn-dark">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
