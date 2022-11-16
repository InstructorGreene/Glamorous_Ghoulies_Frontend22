import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import Register from "./components/Register";
import ViewBookings from "./components/ViewBookings.jsx";
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
				<Route path="/" element={<div>App</div>} /> {/* Landing Page*/}
				<Route
					path="/login"
					element={
						<Login loggedIn={(token) => loggedIn(token)} client={client} />
					}
				/>
				<Route path="/bookings">
					<Route path="/bookings/new" element={<NewBooking />} />
					<Route path="/bookings/view" element={<ViewBookings />} />
				</Route>
				<Route path="/register" element={<Register client={client} />} />
			</Routes>
		</>
	);
};

export default App;
