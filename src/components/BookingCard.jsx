import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaHandshake, FaHeart, FaPhone } from "react-icons/fa";
import { GiSewingNeedle } from "react-icons/gi";
import { MdConfirmationNumber, MdOutlineError } from "react-icons/md";
import "./BookingCard.css";

const BookingCard = (props) => {
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
			icon: <MdOutlineError />,
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
		<div className={`booking-card ${props.isSelected ? "selected" : ""}`}>
			<div className="fb col" style={{ height: "100%" }}>
				<div
					className="fb row"
					style={{
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
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
						<p>
							Name:
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
							Email:
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
							Telephone:
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
							props.changeStatus ? "pointer" : ""
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
