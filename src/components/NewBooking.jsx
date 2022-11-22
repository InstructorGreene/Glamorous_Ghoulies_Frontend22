import React, { useState } from "react";
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
			// TODO: Pitch Id of -1 should be set
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
		} catch (error) {
			alert("Something went wrong");
			throw error;
		}
	};

	return (
		<div className="centered" style={{ paddingTop: "2rem" }}>
			<div>
				<div className="title header-font centered">
					<h1>Booking Registration</h1>
				</div>
				<form onSubmit={(event) => submitHandler(event)}>
					<div className="fb col booking-form">
						<label>
							<h2 className="header-font">Select type of stall:</h2>
						</label>
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
								required
							/>
							Charity
						</label>

						<h2 className="header-font">Business/Charity name</h2>
						<input
							className="form-input"
							name="business"
							type="text"
							placeholder="Business/charity name"
							value={bookingDetails.business}
							onChange={(event) => changeHandler(event)}
							required
						/>

						<h2 className="header-font">Full name</h2>
						<input
							className="form-input"
							name="name"
							type="text"
							placeholder="Full name"
							value={bookingDetails.name}
							onChange={(event) => changeHandler(event)}
							required
						/>

						<h2 className="header-font">Email</h2>
						<input
							className="form-input"
							name="email"
							type="email"
							value={bookingDetails.email}
							placeholder="Email"
							onChange={(event) => changeHandler(event)}
							required
						/>
						<h2 className="header-font">Phone number</h2>
						<input
							className="form-input"
							name="telephone"
							type="text"
							value={bookingDetails.telephone}
							onChange={(event) => changeHandler(event)}
							placeholder="Phone number"
							required
						/>
						<h2 className="header-font">
							Any additional information that you want to share before booking?
						</h2>
						<textarea
							className="form-input"
							name="comments"
							type="text"
							value={bookingDetails.comments}
							onChange={(event) => changeHandler(event)}
							placeholder="Enter your comment here..."
						/>
						<div className="centered">
							<button
								className="btn"
								type="submit"
								style={{ marginTop: "2rem" }}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewBooking;
