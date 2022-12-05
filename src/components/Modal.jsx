import React, { useEffect } from "react";
import "./Modal.css";
import NewBooking from "./NewBooking";

const Modal = (props) => {
	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);

		// close with esc
		function onKeyDown(event) {
			if (event.keyCode === 27) {
				props.onRequestClose();
			}
		}

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (
		<div className="modal-bg">
			<div className="modal-fg">
				<div className="fb">
					<button
						className="btn red ml-auto"
						onClick={() => props.onRequestClose()}
					>
						X
					</button>
				</div>
				<NewBooking
					refresh={props.refresh}
					// setUpdated={() => props.setUpdated()}
					client={props.client}
					selectedUser={props.selectedUser}
				/>
			</div>
		</div>
	);
};

export default Modal;
