
import Modal from "react-modal";
import { useState } from "react";
import NotificationModal from "./NotificationModal";

Modal.setAppElement("#root");

function DropdownContent({ closeDropdown,notification , userData }) {

	let userType=window.localStorage.getItem("userType");


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
			

			{userType==1 && <   Modal
				isOpen={modal}
				onRequestClose={offModal}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						backgroundColor: "rgba(105,105,105,0.3)",
						
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
				<NotificationModal notificationId={notification._id} studentInfo={userData} debuggerInfo={notification.debuggerData} doubtInfo={notification.doubtData} offModal={offModal} />
			</Modal> }


			

			{/*  */}
		</div>
	);
}

export default DropdownContent;
