import React, { useState } from "react";
import "./Finance.css";
import UserList from "./UserList";
import ViewBookings from "./ViewBookings";

const Finance = (props) => {
	const [selectedUser, setSelectedUser] = useState(undefined);
	const [selectedBooking, setSelectedBooking] = useState(undefined);
	const [updated, setUpdated] = useState(0);

	const changeStatus = async () => {
		let changeTo =
			selectedBooking.status.toLowerCase() === "paid" ? "unpaid" : "paid";
		let updatedBooking = { ...selectedBooking, status: changeTo };
		await props.client.updateBooking(updatedBooking);
		setSelectedBooking(updatedBooking);
		setUpdated(updated + 1);
	};

	return (
		<div className="fb row">
			<div
				className="fb col"
				style={{
					borderRight: "1px solid #aaa",
					minWidth: "415px",
				}}
			>
				<h2 className="header-font finance-header">Select a user:</h2>
				<UserList
					client={props.client}
					token={props.token}
					setSelectedUser={setSelectedUser}
				/>
			</div>
			<div className="fb col" style={{ minHeight: "90vh", minWidth: "75%" }}>
				<h2 className="header-font finance-header">
					Selected user's bookings:
				</h2>
				{selectedUser ? (
					<ViewBookings
						client={props.client}
						token={props.token}
						user={selectedUser}
						setSelectedBooking={setSelectedBooking}
						updated={updated}
					/>
				) : (
					<div
						className="header-font finance-header centered"
						style={{ width: "100%", height: "100%" }}
					>
						Begin by selecting a user to view their bookings.
					</div>
				)}
				<div className="centered">
					<button className="btn" onClick={() => changeStatus()}>
						Set as paid/unpaid
					</button>
				</div>
			</div>
		</div>
	);
	// TODO: If there is no selectedUser, display message
};

export default Finance;
