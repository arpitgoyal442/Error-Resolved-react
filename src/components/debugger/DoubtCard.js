import React, { useEffect } from "react";
import ReactLoading from "react-loading";

import Modal from "react-modal";
import { useState } from "react";
import DoubtModal from "./DoubtModal.js";
import axios from "axios";

import {useNavigate} from "react-router-dom";

import { socket } from "../../socket.js";

import { URL } from "../../Globals/Constants.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




Modal.setAppElement("#root");

function DoubtCard(props) {

	const navigate=useNavigate();

	console.log("props aboutDoubt is")
	console.log(props.aboutDoubt)

	const [doubtStatus,setDoubtStatus]=useState(props.isRequested?"Requested":"Request");
	const [solvingNow,setSolvingNow]=useState(props.solvingNow);


	// console.log(props.aboutDoubt._id+"is in doubtCard ");



	const [modal, setModal] = useState(false);
	

	

	const OnModal = () => {
		setModal(true);
	};

	const offModal = () => {
		setModal(false);
	};

	const makeRequest=()=>{


		if(doubtStatus==="Requested")
		{
			toast.info('Already Requested Kindly wait for response', {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			
				theme:'dark'
				});
		}

		else {
			let debuggerId=window.localStorage.getItem("userId");
			let doubtId=props.aboutDoubt._id;
			let studentId=props.aboutDoubt.studentId;

			
			
			axios.post(`${URL}/debugger/request/${debuggerId}`,{doubtId:doubtId,studentId:studentId})
			.then((data)=>{

				setDoubtStatus("Requested")
				

				toast('Requested Successfully ', {
					position: "bottom-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				
					theme:'dark'
					});


					socket.emit("request-doubt",data.data)
				 
				console.log("Successfull request");
				console.log(data);
			})
			.catch((err)=>{

				console.log("Error in request");
				console.log(err);

			})
			
		}

	}


	useEffect(()=>{

		socket.on("student-accept-request",(data)=>{

			console.log("student-accept-request inside DoubtCard");
			console.log(data.doubtId+"  "+props.aboutDoubt._id)
			if(data.doubtId==props.aboutDoubt._id)
			setSolvingNow(true);


		})
            // eslint-disable-next-line
	},[])

	const openDoubt=()=>{

		navigate(`/debugger/solve-doubt/${props.aboutDoubt._id}` ,{state:{aboutDoubt:props.aboutDoubt}});
		
		
	}

	return (
		<div className="doubtCard">
			<div className="doubtCard_navbar">
			
				
				<ReactLoading
					type={ props.aboutDoubt.status=== "active" || props.aboutDoubt.debuggerId===window.localStorage.getItem("userId") ? "blank" : "bars"}
					color="gray"
					height="9%"
					width="9%"
				/>
				<h2>{props.aboutDoubt.topic}</h2>
				<p>{props.aboutDoubt.postedTime}</p>
			</div>
			<ToastContainer />

			<div className="doubtCard_body">
				<div>
					<h5 className="heading">Budget</h5>
					<p>₹ {props.aboutDoubt.price}</p>
				</div>
				<div>
					<h5 className="heading">Description</h5>
					<p className="doubtCard_text">
						{props.aboutDoubt.shortDescription}
					</p>
				</div>
			</div>
			<div className="doubtCard_footer">
				<button onClick={OnModal} className="doubtCard_view">
					View
				</button>

				{ !solvingNow && props.aboutDoubt.status === "active" && <button  onClick={makeRequest} className="doubtCard_request">{doubtStatus}</button>}
				{solvingNow && <button onClick={openDoubt} className="doubtCard_open">Open</button> }
			</div>

			<Modal
				isOpen={modal}
				onRequestClose={() => {
					setModal(false);
				}}
				style={{
					overlay: {
						backgroundColor: "rgba(105,105,105,0.3)",
						zIndex: "2",
					},
					content: {
						padding: "0",
						
						marginTop: "35vh",
						

						height:"fit-content",
						maxHeight:"400px",

						border: "1px solid black",
						background: "#fff",

						WebkitOverflowScrolling: "touch",
						borderRadius: "4px",
						

						scrollbarWidth: "0",
						marginLeft:"auto",
						marginRight:"auto",

						width: ( window.innerWidth>=600) ?"40%":"80%",
						
					},
				}}
			>
				<DoubtModal offModal={offModal} doubtInfo={props.aboutDoubt} />
			</Modal>
		</div>
	);
}

export default DoubtCard;
