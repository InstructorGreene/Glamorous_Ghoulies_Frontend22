import React, { useState } from "react";

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
			alert(
				"Your password must be at least 6 characters in length and must contain a number"
			);
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
			await props.client.addUser(
				userDetails.username,
				userDetails.email,
				userDetails.password
			);
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
		<div className="fb centered container">
			<div className="fb col login-widget centered">
				<h2>Register</h2>
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
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
