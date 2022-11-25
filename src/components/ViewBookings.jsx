import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ViewBookings = (props) => {
	const [bookings, setBookings] = useState(undefined);
	const [selected, setSelected] = useState(-1);

	useEffect(() => {
		const callApi = async () => {
			if (props.user === undefined) {
				setBookings((await props.client.getMyBookings(props.token)).data);
			} else {
				setBookings((await props.client.getMyBookings(props.user)).data);
			}
		};
		callApi();
	}, [props.client, props.token, props.user, props.updated]);

	//TODO: Setup prop of user to search, if prop != undefined, fetch, otherwise do line 8

	const buildBookings = () => {
		let existingBookings = bookings?.map((stall, i) => {
			return (
				<div
					key={i}
					onClick={() => {
						props.setSelectedBooking(stall);
						setSelected(i);
					}}
				>
					<BookingCard
						name={stall.name}
						business={stall.business}
						email={stall.email}
						telephone={stall.telephone}
						type={stall.type}
						comments={stall.comments}
						status={stall.status}
						pitchNo={stall.pitchNo}
						isSelected={i === selected}
					/>
				</div>
			);
		});
		//TODO: test whether this return can be refactored or not
		return existingBookings;
	};

	return (
		<>
			<div
				className="fb row mg-1 centered"
				style={{ gap: "1rem", flexWrap: "wrap" }}
			>
				{buildBookings()}
			</div>
		</>
	);
};

export default ViewBookings;
