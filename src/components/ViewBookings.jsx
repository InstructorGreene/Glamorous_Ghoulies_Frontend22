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
		// If deleted is set to true in Admin page, deselect and set deleted back to false
		if (props.deleted) {
			props.setDeleted(false);
			setSelected(-1);
		}

		callApi();
	}, [props.client, props.token, props.user, props.updated, props.deleted]);
	//TODO: Setup prop of user to search, if prop != undefined, fetch, otherwise do line 8

	useEffect(() => {
		if (props.editingBooking !== -1) {
		}
	}, [props.editingBooking]);

	const buildBookings = () => {
		let existingBookings = bookings?.map((stall, i) => {
			return (
				<div
					key={i}
					onClick={() => {
						if (props.setSelectedBooking) {
							props.setSelectedBooking(stall);
							setSelected(i);
						}
					}}
				>
					<BookingCard
						_id={stall._id}
						userId={stall.userId}
						name={stall.name}
						business={stall.business}
						email={stall.email}
						telephone={stall.telephone}
						type={stall.type}
						comments={stall.comments}
						status={stall.status}
						pitchNo={stall.pitchNo}
						isSelected={i === selected}
						editable={props.editingBooking === stall._id}
						view={props.view}
						changeStatus={(booking) => props.changeStatus(booking)}
						deleteBooking={(id) => props.deleteBooking(id)}
						// saveEdits={props.editingBooking === stall._id && props.saveEdits}
						// setSaveEdits={props.setSaveEdits}
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
