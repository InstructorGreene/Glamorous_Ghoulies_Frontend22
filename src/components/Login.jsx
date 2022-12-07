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

	document.body.style.overflow = "hidden";

	return (
		<div className="fb" style={{ width: "100vw", height: "100vh" }}>
			<div className="sidenav centered" style={{ position: "absolute" }}>
				<div>
					<img
						className="stannington-carnival-sidebar"
						style={{ width: "50%" }}
						src={require("../images/stannington.jpg")}
						alt={"event it logo"}
					/>
					<div className="login-main-text mg-0">
						<span>
							<h2 style={{ marginTop: "0" }}>CELEBRATING STANNINGTON</h2>
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
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img
				style={{ hegith: "100vh", marginLeft: "auto" }}
				src="https://images.unsplash.com/photo-1557674835-b5fe95cdc92e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
				alt="carnival"
			/>
		</div>
	);
};

export default Login;
