import React from "react";
import { Link } from "react-router-dom";

const StaffPortal = (props) => {
	return (
		<div className="fb col mg-2 centered" style={{ gap: "3rem" }}>
			<div className="header-font" style={{ fontSize: "32px" }}>
				Welcome to the staff portal
			</div>
			<div className="fb col" style={{ width: "20rem", gap: "2rem" }}>
				<Link to="/staff/finance">
					<button className="btn" style={{ width: "100%" }}>
						Finance Officer Controls
					</button>
				</Link>
				<Link to="/staff/allocation">
					<button className="btn" style={{ width: "100%" }}>
						Stall Allocation Controls
					</button>
				</Link>
				<Link to="/staff/committee">
					<button className="btn" style={{ width: "100%" }}>
						Committee Controls
					</button>
				</Link>
				<Link to="/staff/admin">
					<button className="btn" style={{ width: "100%" }}>
						Admin Officer Controls
					</button>
				</Link>
			</div>
		</div>
	);
};

export default StaffPortal;
