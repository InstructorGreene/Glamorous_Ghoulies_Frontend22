import React from "react";
import { Link } from "react-router-dom";
import "./ShowcaseItem.css";

const ShowcaseItem = (props) => {
	return (
		<div className="showcase-item">
			<Link to={props.link} className="no-td fb col">
				<img
					className="showcase-item-image"
					src={props.image}
					alt="Classic cars"
				/>
				<div className="fb col showcase-item-body">
					<div className="fb col" style={{ gap: "0.5rem" }}>
						<p className="header-font" style={{ fontSize: "32px" }}>
							{props.title}
						</p>
						<p>{props.body}</p>
						<p
							style={{
								marginLeft: "auto",
								color: "#444",
							}}
						>
							Click to learn more
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ShowcaseItem;
