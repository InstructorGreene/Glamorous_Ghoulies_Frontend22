import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const ViewBookings = (props) => {
	const [bookings, setBookings] = useState(undefined);
	const [selected, setSelected] = useState(-1);
	const [bookingChanged, setBookingChanged] = useState(0);

	useEffect(() => {
		const callApi = async () => {
			if (props.user === undefined) {
				if (props.status !== undefined) {
					setBookings((await props.client.getByStatus(props.status)).data);
				} else {
					setBookings((await props.client.getMyBookings(props.token)).data);
				}
			} else {
				setBookings((await props.client.getMyBookings(props.user)).data);
			}
		};
		callApi();
		/*eslint-disable*/
	}, [
		props.client,
		props.token,
		props.user,
		props.updated,
		props.deleted,
		props.status,
		bookingChanged,
	]); /*eslint-enable*/

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
						client={props.client}
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
						setBookings={setBookings}
						changeStatus={(booking) => props.changeStatus(booking)}
						deleteBooking={(id) => props.deleteBooking(id)}
						updated={(number) => setBookingChanged(number)}
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
				{(bookings && bookings.length) > 0 ? (
					buildBookings()
				) : (
					<p>No bookings were found that matched your selected filters.</p>
				)}
			</div>
		</>
	);
};

export default ViewBookings;
