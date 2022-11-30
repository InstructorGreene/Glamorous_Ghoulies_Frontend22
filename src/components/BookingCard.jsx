import React, { useState } from "react";
import {
	FaCheckCircle,
	FaHandshake,
	FaHeart,
	FaPhone,
	FaTimesCircle,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GiSewingNeedle } from "react-icons/gi";
import { ImBin } from "react-icons/im";
import { MdConfirmationNumber } from "react-icons/md";
import "./BookingCard.css";

const BookingCard = (props) => {
	const [isHovered, setIsHovered] = useState(false);

	// const [editableFields, setEditableFields] = useState({
	// 	business: props.business,
	// 	name: props.name,
	// 	email: props.email,
	// 	telephone: props.telephone,
	// });

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
			icon: <FaTimesCircle />,
			colour: "#E05147" /* Red */,
		},
	};

	// useEffect(() => {
	// 	const updateApi = async () => {
	// 		console.log("saving");
	// 		console.log(
	// 			Object.assign(
	// 				{},
	// 				{
	// 					_id: props._id,
	// 					name: props.name,
	// 					business: props.business,
	// 					email: props.email,
	// 					telephone: props.telephone,
	// 					type: props.type,
	// 					comments: props.comments,
	// 					status: props.status,
	// 					userId: props.userId,
	// 					pitchNo: props.pitchNo,
	// 				},
	// 				editableFields
	// 			)
	// 		);
	// 		await props.client.updateBooking(
	// 			({
	// 				_id: props._id,
	// 				name: props.name,
	// 				business: props.business,
	// 				email: props.email,
	// 				telephone: props.telephone,
	// 				type: props.type,
	// 				comments: props.comments,
	// 				status: props.status,
	// 				userId: props.userId,
	// 				pitchNo: props.pitchNo,
	// 			},
	// 			editableFields)
	// 		);
	// 	};
	// 	if (props.saveEdits) {
	// 		updateApi();
	// 		props.setSaveEdits(false);
	// 	}
	// }, [props.saveEdits, props.client, props.editableFields, editableFields]);

	// Just for payment status
	const capitaliseFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<div
			className={`booking-card ${props.isSelected ? "selected" : ""}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="fb row" style={{ justifyContent: "space-between" }}>
				<div
					className="card-type fb row stall-type"
					style={{
						backgroundColor: bookingTypes[props.type.toLowerCase()].colour,
					}}
				>
					{bookingTypes[props.type.toLowerCase()].icon}
					<p className="mg-0">{props.type}</p>
				</div>
				<div
					className="fb row gap-1"
					style={
						isHovered && props.view === "admin"
							? { display: "flex" }
							: { display: "none" }
					}
				>
					<div className="fb row mg-0 card-type orange icon pointer gap-0">
						<p className="icon-label mg-0">Edit</p>
						<FiEdit style={{ height: "70%" }} />
					</div>
					<div
						className="fb row mg-0 card-type red icon pointer gap-0"
						onClick={() => props.deleteBooking(props._id)}
						// onClick={() => props.deleteBooking({ id: props._id })}
					>
						<p className="icon-label mg-0">Delete</p>
						<ImBin style={{ height: "70%" }} />
					</div>
				</div>
			</div>
			<div className="fb col" style={{ height: "90%" }}>
				<div className="fb row centered">
					<p
						className="card-bold mg-0"
						contentEditable={props.editable}
						// onInput={(e) => {
						// 	setEditableFields({
						// 		...editableFields,
						// 		business: e.currentTarget.textContent,
						// 	});
						// 	console.log(editableFields);
						// }}
					>
						{props.business}
					</p>
				</div>
				<div className="fb col">
					<div
						className="fb row card-contact-header"
						style={{ margin: "0.5rem 0" }}
					>
						<FaPhone />
						Contact Information
					</div>
					<div className="card-contact-info">
						<p>
							<span className="bold">Name:&nbsp;</span>
							<span
								contentEditable={props.editable}
								// onInput={(e) => {
								// 	setEditableFields({
								// 		...editableFields,
								// 		name: e.currentTarget.textContent,
								// 	});
								// }}
							>
								{props.name}
							</span>
						</p>
						<p>
							<span className="bold">Email: </span>
							<span
								contentEditable={props.editable}
								// onInput={(e) => {
								// 	setEditableFields({
								// 		...editableFields,
								// 		email: e.currentTarget.textContent,
								// 	});
								// }}
							>
								{props.email}
							</span>
						</p>
						<p>
							<span className="bold">Telephone: </span>
							<span
								contentEditable={props.editable}
								// onInput={(e) => {
								// 	setEditableFields({
								// 		...editableFields,
								// 		telephone: e.currentTarget.textContent,
								// 	});
								// }}
							>
								{props.telephone}
							</span>
						</p>
					</div>
					{props.comments && props.comments.toLowerCase() !== "no" ? (
						<p className="mg-0" style={{ overflowY: "auto", height: "4.5rem" }}>
							<span className="bold">Additional Comments: </span>
							{props.comments}
						</p>
					) : (
						<></>
					)}
				</div>
				<div
					className={"fb col centered"}
					style={{ gap: "0.5rem", marginTop: "auto" }}
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
						onClick={
							props.view === "finance"
								? () =>
										props.changeStatus({
											_id: props._id,
											name: props.name,
											business: props.business,
											email: props.email,
											telephone: props.telephone,
											type: props.type,
											comments: props.comments,
											status: props.status,
											userId: props.userId,
											pitchNo: props.pitchNo,
										})
								: null
						}
						className={`card-type centered ${
							props.view === "finance" ? "pointer" : ""
						}`}
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
