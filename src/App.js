import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewBooking from "./components/NewBooking";
import ViewBookings from "./components/ViewBookings.jsx";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<div>App</div>
						</div>
					}
				/>{" "}
				{/* Landing Page*/}
				<Route
					path="/login"
					element={
						<div>
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
								<NewBooking />
							</div>
						}
					/>
					<Route
						path="/bookings/view"
						element={
							<div>
								<ViewBookings />
							</div>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;
