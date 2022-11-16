import React from "react";
import { Link } from "react-router-dom";
import "../images/stannington.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar col">
      <img
        className="stannington-carnival-logo"
        style={{ width: "5.8%", margin: 0 }}
        src={require("../images/stannington.jpg")}
        alt={"event it logo"}
      />
      <Link to="/">
        <button className="nav-btn">Home</button>
      </Link>
      <div className="nav-buttons">
        <Link to="/register">
          <button className="nav-btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="nav-btn">Login</button>
        </Link>
        <Link to="/bookings/new">
          <button className="nav-btn">Book</button>
        </Link>
        <Link to="/bookings/view">
          <button className="nav-btn">View Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
