import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import Register from "./components/Register";
import ViewBookings from "./components/ViewBookings.jsx";

const App = () => {
	const [token, changeToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient();

	// Handle token once generated
	const loggedIn = (token) => {
		window.localStorage.setItem("token", token);
		changeToken(token);
	};

	const testBackend = async () => {
		let request = await client.getUsers();
		console.log(request.data);
	};

	return (
<<<<<<< Updated upstream
		<Routes>
			<Route
				path="/"
				element={
					<div>
						<Navbar />
						<div>App</div>
					</div>
				}
			/>{" "}
			{/* Landing Page*/}
			<Route
				path="/login"
				element={
					<div>
						<Navbar />
						<Login />
					</div>
				}
			/>{" "}
			{/* Login Page */}
			<Route path="/bookings">
=======
		<>
			<Navbar />
			<Routes>
				{/* Landing Page*/}
>>>>>>> Stashed changes
				<Route
					path="/bookings/new"
					element={
						<div>
<<<<<<< Updated upstream
							<Navbar />
							<NewBooking />
						</div>
					}
				/>
=======
							<div>App</div>
							<button onClick={() => testBackend()}>
								test users table fetch
							</button>
						</div>
					}
				/>{" "}
				{/* Login Page */}
>>>>>>> Stashed changes
				<Route
					path="/bookings/view"
					element={
<<<<<<< Updated upstream
						<div>
							<Navbar />
							<ViewBookings />
						</div>
					}
				/>
			</Route>
		</Routes>
=======
						<Login client={client} loggedIn={(token) => loggedIn(token)} />
					}
				/>{" "}
				<Route path="/register" element={<Register client={client} />} />
				<Route path="/bookings">
					<Route path="/bookings/new" element={<NewBooking />} />
					<Route path="/bookings/view" element={<ViewBookings />} />
				</Route>
			</Routes>
		</>
>>>>>>> Stashed changes
	);
};

export default App;
