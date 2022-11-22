import React, { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./NewBooking.css";

const NewBooking = (props) => {
	const [bookingDetails, setBookingDetails] = useState({
		name: "",
		business: "",
		email: "",
		telephone: "",
		type: "",
		comments: "",
		status: "unpaid",
	});

	toastr.options = {
		positionClass: "toast-bottom-right",
		closeButton: true,
	};

	const changeHandler = (event) => {
		// Updates states on input box change
		let fieldValue = event.target.value;
		let fieldName = event.target.name;
		const newState = { ...bookingDetails };
		newState[fieldName] = fieldValue;
		setBookingDetails(newState);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		let userId = (await props.client.getUserFromToken(props.token)).data._id;
		try {
			// TODO: Add pitchNo field
			const res = await props.client.addBooking({
				name: bookingDetails.name,
				business: bookingDetails.business,
				email: bookingDetails.email,
				telephone: bookingDetails.telephone,
				type: bookingDetails.type,
				comments: bookingDetails.comments,
				status: bookingDetails.status,
				userId: userId,
			});
			console.log(res.data.message);
			toastr["success"](
				"Your booking has been submitted. We'll be in contact with you soon.",
				"Success!"
			);
		} catch (error) {
			toastr["error"](
				"Something has gone wrong while submitting your booking, please contact us directly.",
				"Error!"
			);
			throw error;
		}
	};

	return (
		<div className="centered" style={{ paddingTop: "2rem" }}>
			<div className="card">
				<div className="title">
					<h2>Booking Registration</h2>
				</div>
				<form onSubmit={(event) => submitHandler(event)}>
					<div className="fb col">
						<label>Select type of stall:</label>
						<label>
							<input
								type="radio"
								name="type"
								value="Craft"
								onChange={(event) => changeHandler(event)}
							/>
							Craft
						</label>
						<label>
							<input
								type="radio"
								name="type"
								value="Commercial"
								onChange={(event) => changeHandler(event)}
							/>
							Commercial
						</label>
						<label>
							<input
								type="radio"
								name="type"
								value="Charity"
								onChange={(event) => changeHandler(event)}
							/>
							Charity
						</label>

						<h2>Business/Charity name</h2>
						<input
							name="business"
							type="text"
							placeholder="Business/charity name"
							value={bookingDetails.business}
							onChange={(event) => changeHandler(event)}
						/>

						<h2>Full name</h2>
						<input
							name="name"
							type="text"
							placeholder="Full name"
							value={bookingDetails.name}
							onChange={(event) => changeHandler(event)}
						/>

						<h2>Email</h2>
						<input
							name="email"
							type="email"
							value={bookingDetails.email}
							placeholder="Email"
							onChange={(event) => changeHandler(event)}
						/>
						<h2>Phone number</h2>
						<input
							name="telephone"
							type="text"
							value={bookingDetails.telephone}
							onChange={(event) => changeHandler(event)}
							placeholder="Phone number"
						/>
						<h2>
							Any additional information that you want to share before booking?
						</h2>
						<textarea
							name="comments"
							type="text"
							value={bookingDetails.comments}
							onChange={(event) => changeHandler(event)}
							placeholder="Enter yout comment here..."
						/>
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewBooking;
