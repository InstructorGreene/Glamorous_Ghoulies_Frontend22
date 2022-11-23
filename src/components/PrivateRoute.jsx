import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
	return props.allowed.includes(props.userRole) ? (
		<Outlet />
	) : (
		<Navigate to="/" />
	);
};

export default PrivateRoute;
