import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "../App.css";
import "./Login.css";

const Login = (props) => {
	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "",
		password: "",
	});

	toastr.options = {
		positionClass: "toast-bottom-right",
		closeButton: true,
	};

	const navigateTo = useNavigate();

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
		event.preventDefault(); // Prevent page refreshing
		try {
			const res = await props.client.login(
				userDetails.username,
				userDetails.password
			);
			props.loggedIn(res.data.token);
			toastr.options.closeButton = true;
			toastr["success"]("Logged in successfully.", "Success!");
			navigateTo("/");
		} catch (error) {
			toastr.options.closeButton = true;
			toastr["error"]("Those details did not match any account.", "Error!");
			throw error;
		}
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
								<div className="btn-container">
									<button type="submit" className="btn">
										Login
									</button>
									<button type="submit" className="btn">
										Register
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
