import React from "react";
import "./NewBooking.css";

const NewBooking = () => {
	return (
		<div className="fb centered container row">
			<div className="booking-widget fb col centered">
				<h2>Booking Registration</h2>
				<form className="fb col booking-form">
					<p1>Select type of stall:</p1>

					<div className="radioBtns">
						<input
							type="radio"
							name="stallRadioBtns"
							// VALUE TBC
							value=""
						/>
						Craft
						<input
							type="radio"
							name="stallRadioBtns"
							// VALUE TBC
							value=""
						/>
						Commercial
						<input
							type="radio"
							name="stallRadioBtns"
							// VALUE TBC
							value=""
						/>
						Charity
					</div>

					<input
						name="bookingName"
						type="text"
						// VALUE TBC
						value=""
						placeholder="Name or Business..."
					/>
					<input
						name="bookingEmail"
						type="text"
						// VALUE TBC
						value=""
						placeholder="Email..."
					/>
					<input
						name="bookingTel"
						type="text"
						// VALUE TBC
						value=""
						placeholder="Telephone no..."
					/>
					<input
						name="bookingComments"
						type="text"
						// VALUE TBC
						value=""
						placeholder="Additional Comments..."
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default NewBooking;
