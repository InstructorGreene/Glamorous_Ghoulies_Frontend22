import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ViewBookings = (props) => {
	const [bookings, setBookings] = useState(undefined);

	useEffect(() => {
		const callApi = async () => {
			setBookings((await props.client.getMyBookings(props.token)).data);
		};
		callApi();
	}, [props.client, props.token]);

	const buildBookings = () => {
		let existingBookings = bookings?.map((stall, i) => {
			return (
				<BookingCard
					key={i}
					name={stall.name}
					business={stall.business}
					email={stall.email}
					telephone={stall.telephone}
					type={stall.type}
					comments={stall.comments}
					status={stall.status}
				/>
			);
		});
		//TODO: test whether this return can be refactored or not
		return existingBookings;
	};

	return (
		<>
			<h1 className="header-font title centered">Your bookings:</h1>
			<div
				className="fb row mg-1 centered"
				style={{ gap: "2rem", flexWrap: "wrap" }}
			>
				{buildBookings()}
			</div>
		</>
	);
};

export default ViewBookings;
