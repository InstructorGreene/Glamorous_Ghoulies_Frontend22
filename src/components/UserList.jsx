import React, { useEffect, useState } from "react";
import "./UserList.css";

const UserList = (props) => {
	const [selected, setSelected] = useState(-1);
	const [users, setUsers] = useState(undefined);

	useEffect(() => {
		const callApi = async () => {
			setUsers((await props.client.getUsers()).data);
		};
		callApi();
	}, [props.client, props.token]);

	const buildUsers = () => {
		let existingUsers = users?.map((user, i) => {
			return (
				<div
					onClick={() => {
						setSelected(i);
						props.setSelectedUser(user.token);
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

	return <div className="fb col mg-1 user-list">{buildUsers()}</div>;
};

export default UserList;
