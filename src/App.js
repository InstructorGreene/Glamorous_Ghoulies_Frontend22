import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NewBooking from "./components/NewBooking";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<div>App</div>} />
			<Route path="/login" element={<Login />} />
			<Route path="/booking/new" element={<NewBooking />} />
		</Routes>
	);
};

export default App;
