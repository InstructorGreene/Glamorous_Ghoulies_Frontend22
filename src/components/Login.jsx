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
		<div className="fb centered container">
			<div className="fb col login-widget centered">
				<h2>Login</h2>
				<form
					className="fb col login-form"
					onSubmit={(event) => submitHandler(event)}
				>
					<input
						name="username"
						type="text"
						value={userDetails.username}
						placeholder="Username..."
						onChange={(event) => changeHandler(event)}
					></input>
					<input
						name="email"
						type="email"
						value={userDetails.email}
						placeholder="Email..."
						onChange={(event) => changeHandler(event)}
					></input>
					<input
						name="password"
						type="password"
						value={userDetails.password}
						placeholder="Password..."
						onChange={(event) => changeHandler(event)}
					></input>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
