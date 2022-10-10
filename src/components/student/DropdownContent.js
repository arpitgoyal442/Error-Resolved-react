
import Modal from "react-modal";
import { useState } from "react";
// import Modal from "../Modal";
import NotificationModal from "./NotificationModal";

Modal.setAppElement("#root");

function DropdownContent({ closeDropdown, notification, userData }) {

	let userType = window.localStorage.getItem("userType");


	const [modal, setModal] = useState(false);
	const onModal = () => {
		closeDropdown();
		setModal(true);
	};
	const offModal = () => {
		setModal(false);
	};


	const modalStyle = {

		overlay: {
			backgroundColor: "rgba(105,105,105,0.3)",
			zIndex: "1000",


		},
		content: {
		      maxWidth:'90vw',
			  maxHeight:'90vh',

			top: '50%',
			left: '50%',
			
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		
		},





	}

	return (
		<div>
			<p style={{ margin: "5px", borderBottom: "1px solid grey" }} id="notificationTile" onClick={onModal}>

				{notification.message}

			</p>
			<hr />


			{userType == 1 && <   Modal
				isOpen={modal}
				onRequestClose={offModal}
				shouldCloseOnOverlayClick={true}
				style={modalStyle}
			>
				<NotificationModal notificationId={notification._id} studentInfo={userData} debuggerInfo={notification.debuggerData} doubtInfo={notification.doubtData} offModal={offModal} />
			</Modal>}

		


		</div>
	);
}

export default DropdownContent;
