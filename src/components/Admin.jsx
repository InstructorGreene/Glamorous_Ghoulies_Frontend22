import React, { useState } from "react";
import toastr from "toastr";
import UserList from "./UserList";
import ViewBookings from "./ViewBookings";

const Admin = (props) => {
	const [selectedUser, setSelectedUser] = useState(undefined);
	const [selectedStatus, setSelectedStatus] = useState(undefined);
	const [selectedBooking, setSelectedBooking] = useState(undefined);
	const [updated, setUpdated] = useState(0);
	const [deleted, setDeleted] = useState(false);
	const [editingBooking, setEditingBooking] = useState(-1);
	const [saveEdits, setSaveEdits] = useState(false);

	toastr.options = {
		positionClass: "toast-bottom-right",
		closeButton: true,
	};

	const deleteBooking = async (id) => {
		await props.client.deleteBooking(id);
		toastr["success"]("The selected booking was deleted.", "Success");
		setUpdated((prev) => prev + 1);
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
				<UserList
					client={props.client}
					token={props.token}
					setSelectedUser={setSelectedUser}
					setSelectedStatus={setSelectedStatus}
				/>
			</div>
			<div className="fb col" style={{ minHeight: "90vh", minWidth: "75%" }}>
				<h2 className="header-font finance-header">
					Selected user's bookings:
				</h2>
				{selectedUser || selectedStatus ? (
					<ViewBookings
						client={props.client}
						token={props.token}
						user={selectedUser}
						status={selectedStatus}
						setSelectedBooking={setSelectedBooking}
						updated={updated} // User for updating
						deleted={deleted} // Used for keeping track when something's been deleted
						setDeleted={setDeleted} // Used to reset deleted state
						editingBooking={editingBooking}
						view="admin"
						deleteBooking={(id) => deleteBooking(id)}

						// saveEdits={saveEdits}
						// setSaveEdits={setSaveEdits}
					/>
				) : (
					<div
						className="header-font finance-header centered"
						style={{ width: "100%", height: "100%" }}
					>
						Begin by selecting a user to view their bookings.
					</div>
				)}
			</div>
		</div>
	);
};

export default Admin;
