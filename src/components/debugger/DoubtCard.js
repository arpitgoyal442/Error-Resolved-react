import React from "react";
import ReactLoading from "react-loading";

import Modal from "react-modal";
import { useState } from "react";
import DoubtModal from "./DoubtModal.js";
import axios from "axios";

import {useNavigate} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


Modal.setAppElement("#root");

function DoubtCard(props) {

	const navigate=useNavigate();


	// console.log(props.aboutDoubt._id+"is in doubtCard ");



	const [modal, setModal] = useState(false);
	

	

	const OnModal = () => {
		setModal(true);
	};

	const offModal = () => {
		setModal(false);
	};

	const makeRequest=()=>{


		if(props.isRequested)
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

			axios.post("http://localhost:9000/debugger/request/"+debuggerId,{doubtId:doubtId,studentId:studentId})
			.then((data)=>{

				

				toast('Requested Successfully ', {
					position: "bottom-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				
					theme:'dark'
					});

					
				 
				console.log("Successfull request");
				console.log(data);
			})
			.catch((err)=>{

				console.log("Error in request");
				console.log(err);

			})
			
		}

	}

	const openDoubt=()=>{

		navigate(`/debugger/solve-doubt/${props.aboutDoubt._id}` ,{state:{aboutDoubt:props.aboutDoubt}});
		
		
	}

	return (
		<div className="doubtCard">
			<div className="doubtCard_navbar">
			
				
				<ReactLoading
					type={props.aboutDoubt.status=== "active" ? "blank" : "bars"}
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
					<h5 className="heading">Amount</h5>
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

				{ !props.solvingNow && props.aboutDoubt.status === "active" && <button  onClick={makeRequest} className="doubtCard_request">{props.isRequested?"Requested":"Request"}</button>}
				{props.solvingNow && <button onClick={openDoubt} className="doubtCard_open">Open</button> }
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
						marginLeft: "28%",
						marginRight:"35%",
						marginTop: "35vh",
						

						height:"fit-content",
						maxHeight:"400px",

						border: "1px solid black",
						background: "#fff",

						WebkitOverflowScrolling: "touch",
						borderRadius: "4px",
						

						scrollbarWidth: "0",

						width: "40%",
						
					},
				}}
			>
				<DoubtModal offModal={offModal} doubtInfo={props.aboutDoubt} />
			</Modal>
		</div>
	);
}

export default DoubtCard;
