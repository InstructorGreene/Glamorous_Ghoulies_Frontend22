import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import ViewBookings from "./components/ViewBookings.jsx";

const App = () => {
	return (
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
				<Route
					path="/bookings/new"
					element={
						<div>
							<Navbar />
							<NewBooking />
						</div>
					}
				/>
				<Route
					path="/bookings/view"
					element={
						<div>
							<Navbar />
							<ViewBookings />
						</div>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
