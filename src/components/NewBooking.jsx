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
		// userId: props.client.getUserFromToken(props.token).data._id,

		// TODO: Add
		// Status should always be 'unpaid'
		// UserId will need to be fetched from backend
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
