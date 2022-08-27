import StarFilled from "@heroicons/react/solid/StarIcon";
import StarEmpty from "@heroicons/react/outline/StarIcon";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { socket } from "../../socket";

function NotificationHandle({debuggerInfo,doubtInfo,studentInfo,offModal}) {

	const navigate=useNavigate();


	let onAccept=()=>{

		let dataToSend={

			debuggerId:debuggerInfo._id,
			debuggerName:debuggerInfo.name,
			doubtId:doubtInfo._id,
			doubtTopic:doubtInfo.topic,
			studentId:studentInfo.userId,
			studentName:studentInfo.userName

		}

		axios.post("http://localhost:9000/student/acceptrequest",dataToSend)
		.then((data)=>{console.log(data);

			toast('😀 Accepted Sucessfully', {
				position: "bottom-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				onClose:offModal,
				theme:"dark"
				});

				let socketData={
					debuggerId:dataToSend.debuggerId,
					doubtId:dataToSend.doubtId,
					message:"Congratulations 🎉🎉 "+dataToSend.studentName+" has accepted your Request for "+dataToSend.doubtTopic+" doubt"
				}

				socket.emit("request-accept",socketData)


		})
		.catch((err)=>{console.log(err)});


	}



	return (
		<div className="notificationHandle">
			<div className="notificationHandle_header">
				<img src={debuggerInfo.imageUrl} alt="" />
				<div className="notificationHandle_header_right">
				<ToastContainer/>
					<h1>{debuggerInfo.name}
					<div>
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarEmpty className="h-6 w-6 text-yellow-400 star" />
							<StarEmpty className="h-6 w-6 text-yellow-400 star" />
						</div>
					</h1>
					
					<div className="notificationHandle_debuggerInfo">
						
						{/* <p> <b>Rating : </b>(4/5) <span className="iconify-inline" data-icon="ant-design:star-filled" style={{color:'rgb(60, 59, 5'}}></span></p> */}
						<p>
							<b>Speciality :</b> Java , c++ , Competitive programming
						</p>
						<p>
							<b>Total doubts solved:</b> {debuggerInfo.doubtSolved}
						</p>
					</div>
				</div>
			</div>
			<hr />

			<div className="notificationHandle_body">
				
				
					<h1>{doubtInfo.topic}</h1>
					<br />
					{doubtInfo.longDescription}
				
			</div>

			<div className="notificationHandle_footer">
				<button onClick={onAccept} >Accept</button>
				<button>Decline</button>
			</div>
		</div>
	);
}

export default NotificationHandle;
