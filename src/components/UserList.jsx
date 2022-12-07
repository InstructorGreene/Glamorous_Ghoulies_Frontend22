import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./UserList.css";

const UserList = (props) => {
	const [selected, setSelected] = useState(-1);
	const [users, setUsers] = useState(undefined);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const callApi = async () => {
			setUsers((await props.client.getUsers()).data);
		};
		callApi();
	}, [props.client, props.token]);

	useEffect(() => {
		props.setSelectedStatus("all");
	}, []);

	const buildUsers = () => {
		let existingUsers = users
			?.filter((user) => {
				return user.username.includes(search);
			})
			.map((user, i) => {
				return (
					<div
						onClick={() => {
							setSelected(i);
							props.setSelectedUser(user.token);
							props.setSelectedStatus(undefined);
						}}
						className="fb row user-li mg-0"
						style={
							i === selected
								? {
										backgroundColor: "rgb(167, 220, 252)",
										justifyContent: "space-between",
								  }
								: { justifyContent: "space-between" }
						}
						key={i}
					>
						<p>{user.username}</p>
						<p>{user.email}</p>
					</div>
				);
			});
		return existingUsers;
	};

	const changeStatusFilter = (newStatus) => {
		props.setSelectedStatus(newStatus);
		props.setSelectedUser(undefined);
		setSelected(-1);
	};

	return (
		<>
			<div className="fb col gap-1">
				<h2 className="header-font finance-header">Filter by status:</h2>
				<div
					className="card-type centered pointer"
					style={{ backgroundColor: "#1cbb55", marginInline: "1rem" }}
					onClick={() => changeStatusFilter("paid")}
				>
					<FaCheckCircle />
					Paid
				</div>
				<div
					className="card-type centered pointer"
					style={{ backgroundColor: "#E05147", marginInline: "1rem" }}
					onClick={() => changeStatusFilter("unpaid")}
				>
					<FaTimesCircle />
					Unpaid
				</div>
				<div
					className="card-type centered pointer"
					style={{ backgroundColor: "#1996fc", marginInline: "1rem" }}
					onClick={() => changeStatusFilter("all")}
				>
					View All
				</div>
			</div>

			<h2 className="header-font finance-header">Select a user:</h2>
			<input
				className="cool-search"
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search for a user"
			/>
			<div className="fb col mg-1 user-list">{buildUsers()}</div>
		</>
	);
};

export default UserList;
