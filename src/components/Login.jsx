import React, { useState } from "react";
import "../App.css";
import "./Login.css";

const Login = () => {
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

	const submitHandler = (event) => {
		// Choose what to do on submit
		event.preventDefault(); // Prevent page refreshing
		alert("ahhh");
	};

	return (
		<div className="login-form">
			<div className="fb col">
				<h2>Login</h2>
				<form onSubmit={(event) => submitHandler(event)}>
					<input
						name="username"
						type="text"
						placeholder="Enter Username..."
						className="user-input"
						onChange={(event) => changeHandler(event)}
					></input>
					<input
						name="email"
						type="email"
						placeholder="Enter Email..."
						className="user-input"
						onChange={(event) => changeHandler(event)}
					></input>
					<input
						name="password"
						type="password"
						placeholder="Enter Password..."
						className="user-input"
						onChange={(event) => changeHandler(event)}
					></input>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
