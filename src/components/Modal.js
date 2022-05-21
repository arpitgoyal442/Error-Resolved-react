import {useEffect} from "react";

const Modal = (props) => {
	useEffect(() => {
		if (props.showModal) {
			document.querySelector("body").style.overflowY = "hidden";
		} else document.querySelector("body").style.overflowY = "auto";
	}, [props.showModal]);

	const closeModal = (e) => {
		if (e.target.id === "modal") props.setShowModal(false);
	};

	return props.showModal ? (
		<div onClick={closeModal} id="modal">
			{props.children}
		</div>
	) : null;
};

export default Modal;
