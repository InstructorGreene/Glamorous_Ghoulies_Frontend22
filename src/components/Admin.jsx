import React, { useState } from "react";
import toastr from "toastr";
import UserList from "./UserList";
import ViewBookings from "./ViewBookings";

const Admin = (props) => {
	const [selectedUser, setSelectedUser] = useState(undefined);
	const [selectedBooking, setSelectedBooking] = useState(undefined);
	const [updated, setUpdated] = useState(0);
	const [deleted, setDeleted] = useState(false);
	const [editingBooking, setEditingBooking] = useState(-1);
	const [saveEdits, setSaveEdits] = useState(false);

	toastr.options = {
		positionClass: "toast-bottom-right",
		closeButton: true,
	};

	const deleteBooking = async () => {
		if (!selectedBooking) {
			// Toastr notification
			toastr["error"](
				"No selection was made! Select a booking and then delete!",
				"Error occured while deleting"
			);
			return;
		}
		await props.client.deleteBooking(selectedBooking._id);
		toastr["success"]("The selected booking was deleted.", "Success");
		setSelectedBooking(undefined);
		setUpdated((prev) => prev + 1);
		setDeleted(true);
	};

	const editBooking = () => {
		if (!selectedBooking) {
			toastr["error"](
				"No selection was made! Select a booking and then edit!",
				"Error occured when trying to edit"
			);
			return;
		}
		setEditingBooking(selectedBooking._id);
	};

	const saveEditChanges = async () => {
		setEditingBooking(-1);
		setSaveEdits(true);
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
						updated={updated} // User for updating
						deleted={deleted} // Used for keeping track when something's been deleted
						setDeleted={setDeleted} // Used to reset deleted state
						editingBooking={editingBooking}
						saveEdits={saveEdits}
						setSaveEdits={setSaveEdits}
					/>
				) : (
					<div
						className="header-font finance-header centered"
						style={{ width: "100%", height: "100%" }}
					>
						Begin by selecting a user to view their bookings.
					</div>
				)}
				<div className="centered" style={{ gap: "1rem" }}>
					<button className="btn red" onClick={() => deleteBooking()}>
						Delete Selected Booking
					</button>
					<button className="btn green" onClick={() => editBooking()}>
						Edit Selected Booking
					</button>
					{editingBooking !== -1 ? (
						<button className="btn" onClick={() => saveEditChanges()}>
							Save changes
						</button>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Admin;
