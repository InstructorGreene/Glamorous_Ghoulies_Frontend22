import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import Admin from "./components/Admin";
import Allocation from "./components/Allocation";
import Committee from "./components/Committee";
import Finance from "./components/Finance.jsx";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import NewStaff from "./components/NewStaff";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import ShowcaseItem from "./components/ShowcaseItem";
import StaffPortal from "./components/StaffPortal";
import ViewBookings from "./components/ViewBookings";
import "./images/classic-cars.jpg";

// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const navTo = useNavigate(); // Used for redirecting user on logout
	const [token, changeToken] = useState(window.localStorage.getItem("token"));
	/* eslint-disable */
	const client = new ApiClient(
		() => token,
		() => logout()
	);
	/* eslint-enable */
	const [userRole, setUserRole] = useState(undefined); // userRole stored in a state for PrivateRoute

	// Handle token once generated
	const loggedIn = (token) => {
		window.localStorage.setItem("token", token);
		changeToken(token);
	};

	const logout = () => {
		window.localStorage.setItem("token", undefined);
		changeToken(undefined);
		navTo("/");
	};

	// Get user role and store in state
	useEffect(() => {
		const fetch = async () => {
			// When user logs themselves out, set userRole back to undefined
			if (!token) {
				setUserRole(undefined);
			} else {
				// Set corresponding userRole of the logged in account
				let role = (await client.getCurrentUser(token)).data.role;
				setUserRole(role);
			}
		};
		fetch();
	}, [client, token]);

	return (
		<>
			<Routes>
				{/* Landing page (Home) */}
				<Route
					path="/"
					element={
						<div>
							<Navbar token={token} changeToken={changeToken} client={client} />
							<div>
								<header className="centered col home-header">
									<span className="header-font" style={{ fontSize: "32px" }}>
										Welcome to Stannington Carnival!
									</span>
								</header>
								<h2 className="header-font mg-2" style={{ fontSize: "32px" }}>
									What's on?
								</h2>
								<div className="fb row showcase">
									<ShowcaseItem
										image={require("./images/classic-cars.jpg")}
										title="Classic Cars"
										body="We have a large selection of Classic Cars on display every year - if you own a classic car and would like to display it, Stannington Carnival would be happy to have you."
										link="/cars"
									/>
								</div>
							</div>
							<h2 className="header-font mg-2" style={{ fontSize: "32px" }}>
								Where are we?
							</h2>
							<div className="centered">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.2398549699756!2d-1.544726216862639!3d53.39264916316159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48797f4522bd298f%3A0xdf7abe3e4eccbb45!2sStannington%20Park!5e0!3m2!1sen!2suk!4v1670427738185!5m2!1sen!2suk"
									width="97%"
									height="550"
									style={{ border: 0, borderRadius: "12px" }}
									loading="lazy"
									title="location-map"
								></iframe>
							</div>
							<h2 className="header-font mg-2" style={{ fontSize: "32px" }}>
								Lorem Ipsummmmm
							</h2>
						</div>
					}
				/>
				<Route
					path="/login"
					element={
						<Login loggedIn={(token) => loggedIn(token)} client={client} />
					}
				/>
				<Route path="/bookings">
					<Route
						path="/bookings/new"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<NewBooking client={client} token={token} />
							</>
						}
					/>
					<Route
						path="/bookings/view"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>

								<h1 className="header-font title centered">Your bookings:</h1>
								<ViewBookings view="holder" client={client} token={token} />
							</>
						}
					/>
				</Route>
				<Route
					element={<PrivateRoute userRole={userRole} allowed={["super"]} />}
				>
					<Route
						path="/new-staff"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<NewStaff client={client} />
							</>
						}
					/>
				</Route>
				<Route
					element={<PrivateRoute userRole={userRole} allowed={["super"]} />}
				>
					<Route
						path="/staff"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<StaffPortal />
							</>
						}
					/>
				</Route>
				<Route
					element={
						<PrivateRoute userRole={userRole} allowed={["finance", "super"]} />
					}
				>
					<Route
						path="/staff/finance"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<Finance client={client} token={token} />
							</>
						}
					/>
				</Route>

				<Route
					element={
						<PrivateRoute
							userRole={userRole}
							allowed={["allocator", "super"]}
						/>
					}
				>
					<Route
						path="/staff/allocator"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<Allocation client={client} token={token} />
							</>
						}
					/>
				</Route>
				<Route
					element={
						<PrivateRoute
							userRole={userRole}
							allowed={["allocator", "super", "finance,", "admin", "committee"]}
						/>
					}
				>
					<Route
						path="/staff/committee"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<Committee client={client} token={token} />
							</>
						}
					/>
				</Route>
				<Route
					element={
						<PrivateRoute userRole={userRole} allowed={["admin", "super"]} />
					}
				>
					<Route
						path="/staff/admin"
						element={
							<>
								<Navbar
									token={token}
									changeToken={changeToken}
									client={client}
								/>
								<Admin client={client} token={token} />
							</>
						}
					/>
				</Route>
				<Route path="/register" element={<Register client={client} />} />
			</Routes>
		</>
	);
};

export default App;
