import React from "react";
import { FaCheckCircle, FaHandshake, FaHeart, FaPhone } from "react-icons/fa";
import { GiSewingNeedle } from "react-icons/gi";
import { MdConfirmationNumber, MdOutlineError } from "react-icons/md";
import "./BookingCard.css";

const BookingCard = (props) => {
	const bookingTypes = {
		craft: {
			icon: <GiSewingNeedle />,
			colour: "#1cbb55" /* Green */,
		},
		charity: {
			icon: <FaHeart />,
			colour: "#E05147" /* Red */,
		},
		commercial: {
			icon: <FaHandshake />,
			colour: "#1c65bb" /* Blue */,
		},
	};

	const statusTypes = {
		paid: {
			icon: <FaCheckCircle />,
			colour: "#1cbb55" /* Green */,
		},
		unpaid: {
			icon: <MdOutlineError />,
			colour: "#E05147" /* Red */,
		},
	};

	// Just for payment status
	const capitaliseFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<div className={`booking-card ${props.isSelected ? "selected" : ""}`}>
			<div className="fb col" style={{ height: "100%" }}>
				<div
					className="fb row"
					style={{
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<p className="card-bold mg-0">{props.business}</p>
					<div
						className="card-type fb row"
						style={{
							backgroundColor: bookingTypes[props.type.toLowerCase()].colour,
						}}
					>
						{bookingTypes[props.type.toLowerCase()].icon}
						<p className="mg-0">{props.type}</p>
					</div>
				</div>
				<div className="fb col centered">
					<div className="fb row card-contact-header">
						<FaPhone />
						Contact Information
					</div>
					<div className="card-contact-info">
						<p>Name: {props.name}</p>
						<p>Email: {props.email}</p>
						<p>Telephone: {props.telephone}</p>
					</div>
					{props.comments && props.comments.toLowerCase() !== "no" ? (
						<p>Additional Comments: {props.comments}</p>
					) : (
						<></>
					)}
				</div>
				<div
					className={"fb col centered"}
					style={{ marginTop: "auto", gap: "0.5rem" }}
				>
					<div className="centered fb" style={{ gap: "0.5rem" }}>
						{!props.pitchNo || props.pitchNo === "-1" ? (
							""
						) : (
							<>
								<MdConfirmationNumber />
								{`Allocated Pitch Number: ${props.pitchNo}`}
							</>
						)}
					</div>
					<div
						className="card-type centered"
						style={{
							width: "100%",
							backgroundColor: statusTypes[props.status.toLowerCase()].colour,
						}}
					>
						{statusTypes[props.status.toLowerCase()].icon}
						<p className="mg-0">{capitaliseFirstLetter(props.status)}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
