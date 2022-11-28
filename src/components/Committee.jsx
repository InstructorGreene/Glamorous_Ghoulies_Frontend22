import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const Committee = (props) => {
	const [proportions, setProportions] = useState({});
	const [totalAssigned, setTotalAssigned] = useState(0);
	const [totalBookingsCount, setTotalBookingsCount] = useState(0);

	let colours = ["#5f5", "#55f", "#f55"];

	useEffect(() => {
		const callApi = async () => {
			setProportions((await props.client.getProportions()).data);
			setTotalAssigned(
				(await props.client.getTotalAssigned()).data["allocated stalls"]
			);
			setTotalBookingsCount((await props.client.getAllBookings()).data.length);
		};
		callApi();
	}, [props.client, props.token]);

	return (
		<div className="centered" style={{ width: "100vw", height: "90vh" }}>
			<div className="fb col centered" style={{ width: "600px" }}>
				<p className="header-font" style={{ fontSize: "25px" }}>
					Stall Type Breakdown:
				</p>
				<PieChart
					label={({ dataEntry }) => `
                ${dataEntry.title}: ${dataEntry.value} (${Math.round(
						dataEntry.percentage
					)}%)`}
					labelPosition={60}
					lineWidth={75}
					labelStyle={{
						fill: "#fff",
						fontSize: "4px",
						pointerEvents: "none",
					}}
					data={Object.entries(proportions).map((item, i) => {
						const [key, value] = item;
						return {
							title: key,
							label: key,
							value: value,
							color: `${colours[i]}`,
							// color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
						};
					})}
				/>
				<div
					className="header-font"
					style={{ fontSize: "25px", textAlign: "center" }}
				>
					<p>
						Total Bookings:
						{` ${totalBookingsCount}`}
					</p>
					<p>
						Total Bookings with assigned Pitch Numbers:
						{` ${totalAssigned}`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Committee;
