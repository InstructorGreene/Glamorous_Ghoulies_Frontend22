import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import Register from "./components/Register";
import ShowcaseItem from "./components/ShowcaseItem";
import ViewBookings from "./components/ViewBookings.jsx";
import "./images/classic-cars.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const [token, changeToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient();

	// Handle token once generated
	const loggedIn = (token) => {
		window.localStorage.setItem("token", token);
		changeToken(token);
	};

	// const testBackend = async () => {
	// 	let request = await client.getUsers();
	// 	console.log(request.data);
	// };

	return (
		<>
			<Navbar token={token} changeToken={changeToken} />
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
				<Route path="/bookings">
					<Route
						path="/bookings/new"
						element={<NewBooking client={client} />}
					/>
					<Route path="/bookings/view" element={<ViewBookings />} />
				</Route>
				<Route path="/register" element={<Register client={client} />} />
			</Routes>
		</>
	);
};

export default App;
