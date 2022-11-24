import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import ShowcaseItem from "./components/ShowcaseItem";
import StaffPortal from "./components/StaffPortal";
import UserList from "./components/UserList";
import ViewBookings from "./components/ViewBookings.jsx";
import "./images/classic-cars.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const navTo = useNavigate(); // Used for redirecting user on logout
	const [token, changeToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient(
		() => token,
		() => logout()
	);
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
			<Navbar token={token} changeToken={changeToken} client={client} />
			<Routes>
				{/* Landing page (Home) */}
				<Route
					path="/"
					element={
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
					}
				/>
				<Route
					path="/login"
					element={
						<Login loggedIn={(token) => loggedIn(token)} client={client} />
					}
				/>
				<Route
					path="/userlist"
					client={client}
					token={token}
					element={<UserList client={client} token={token} />}
				/>
				<Route path="/bookings">
					<Route
						path="/bookings/new"
						element={<NewBooking client={client} token={token} />}
					/>
					<Route
						path="/bookings/view"
						element={<ViewBookings client={client} token={token} />}
					/>
				</Route>
				<Route
					element={
						<PrivateRoute
							userRole={userRole}
							allowed={["admin", "finance", "committee", "allocator"]}
						/>
					}
				>
					<Route path="/staff" element={<StaffPortal />} />
				</Route>
				<Route path="/register" element={<Register client={client} />} />
			</Routes>
		</>
	);
};

export default App;
