
import Modal from "react-modal";
import { useState } from "react";
import NotificationModal from "./NotificationModal";

Modal.setAppElement("#root");

function DropdownContent({ closeDropdown,notification }) {

	console.log("Notification is");
	console.log(notification);

	const [modal, setModal] = useState(false);
	const onModal = () => {
		closeDropdown();
		setModal(true);
	};
	const offModal = () => {
		setModal(false);
	};
	return (
		<div>
			<p id="notificationTile" onClick={onModal}>
				
				{notification.message}
				
			</p>
			<hr />
			<Modal
				isOpen={modal}
				onRequestClose={offModal}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						backgroundColor: "rgba(105,105,105,0.3)",
						// backgroundColor:"red",
						zIndex: "1",

						
					},
					content: {
						padding: "10",
						marginLeft: "27vw",
						marginTop: "10vh",
						marginBottom: "10vh",
						border: "1px solid black",
						background: "#fff",
						WebkitOverflowScrolling: "touch",
						borderRadius: "4px",
						//  overflowY:"auto",
						scrollbarWidth: "0",
						width: "50%",
					},
				}}
			>
				<NotificationModal debuggerInfo={notification.debuggerData}  offModal={offModal} />
			</Modal>

			{/*  */}
		</div>
	);
}

export default DropdownContent;
