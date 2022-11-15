import React from "react";
import { Link } from "react-router-dom";
import "../images/logo.webp";

const Navbar = () => {
	return (
		<div className="fb row">
			<img
				className="stannington-carnival-logo"
				src={require("../images/logo.webp")}
				alt={"event it logo"}
			/>
			<Link to="/">
				<button>Home</button>
			</Link>
			<Link to="/login">
				<button>Login</button>
			</Link>
			<Link to="/bookings/new">
				<button>Book</button>
			</Link>
			<Link to="/bookings/view">
				<button>View Bookings</button>
			</Link>
		</div>
	);
};

export default Navbar;
