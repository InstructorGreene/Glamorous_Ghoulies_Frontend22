import React, { useState } from "react";
import toastr from "toastr";
import UserList from "./UserList";
import ViewBookings from "./ViewBookings";

const Allocation = (props) => {
	const [selectedUser, setSelectedUser] = useState(undefined);
	const [selectedBooking, setSelectedBooking] = useState(undefined);
	const [updated, setUpdated] = useState(0);
	const [userInput, setUserInput] = useState("");

	toastr.options = {
		positionClass: "toast-bottom-right",
		closeButton: true,
	};

	const changePitchNo = async (event) => {
		event.preventDefault();
		if (!(userInput > 0)) {
			toastr["error"]("Pitch number must be a positive number!", "Error!");
			return;
		}
		if (!(await props.client.checkPitchNo(userInput)).data) {
			let updatedBooking = { ...selectedBooking, pitchNo: userInput };
			await props.client.updateBooking(updatedBooking);
			setSelectedBooking(updatedBooking);
			setUpdated(updated + 1);
			toastr["success"]("Pitch number assigned!", "Success!");
		} else {
			toastr["error"](
				"A booking with that pitch number already exists!",
				"Error!"
			);
		}
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
					<form onSubmit={(event) => changePitchNo(event)}>
						<label>
							Pitch Number:
							<input
								onChange={(event) => setUserInput(event.target.value)}
								name="pitchNo-input"
								type="number"
								className="form-input"
								placeholder="Enter pitch number..."
							/>
						</label>
						<button type="submit" className="btn">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Allocation;
