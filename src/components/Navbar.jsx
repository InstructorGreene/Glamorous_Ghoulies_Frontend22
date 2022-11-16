import React from "react";
import { Link } from "react-router-dom";
import "../images/stannington.jpg";
import "./Navbar.css";


const Navbar = (props) => {
	const logout = (changeToken) => {
		// removes token from local storage
		// removes the token from app.js
		window.localStorage.removeItem("token");
		changeToken(undefined);
	};

	return (
		<div className="navbar fb row">
			<Link to="/">
				<img
        className="stannington-carnival-logo"
        style={{ width: "5.8%" }}
        src={require("../images/stannington.jpg")}
        alt={"event it logo"}
      />
			</Link>
			<Link to="/">
				<button className="nav-btn">Home</button>
			</Link>
			<div className="nav-buttons">
				<Link
					style={!props.token ? { display: "block" } : { display: "none" }}
					to="/register"
				>
					<button className="nav-btn">Register</button>
				</Link>
				<Link
					to="/login"
					style={!props.token ? { display: "block" } : { display: "none" }}
				>
					<button className="nav-btn">Login</button>
				</Link>
				<Link to={!props.token ? "/login" : "/bookings/new"}>
					<button className="nav-btn">Book</button>
				</Link>
				<Link to={!props.token ? "/login" : "/bookings/view"}>
					<button className="nav-btn">View Bookings</button>
				</Link>
				<Link className="no-td">
					{/* no-td hides text decoration of the Link (it has onClick so it has underline ) */}
					<button
						className="nav-btn"
						onClick={() => logout(props.changeToken)}
						style={props.token ? { display: "block" } : { display: "none" }}
						// There is no ! in this ternary, so it acts the opposite to the other styles
					>
						Log out
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
