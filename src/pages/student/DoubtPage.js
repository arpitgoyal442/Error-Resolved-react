import ScreenShare from "../../components/doubtComponents/ScreenShare.js";
import MobileDoubtPage from "../../components/MobileDoubtPage.js";
import Navbar from "../../components/Navbar.js";
import Document from "../../components/doubtComponents/Document.js";

import { useLocation } from "react-router-dom";

import io from "socket.io-client";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const socket = io.connect('http://localhost:3000');

const DoubtPage = () => {

	const [message,setMessage]=useState("");
	const [allMessages,setAllMessages]=useState([]);

	const {aboutDoubt} =useLocation().state;

	useEffect(()=>{

		axios.get("http://localhost:9000/doubt/chats/"+aboutDoubt._id).then((data)=>{

		console.log(data.data.chats);
		setAllMessages(data.data.chats)

		
		}).catch((err)=>{
			console.log(err);
		})

	},[])

	console.log(aboutDoubt);

	let studentId=aboutDoubt.studentId;
	let studentName=aboutDoubt.studentName;
	let doubtId=aboutDoubt._id;
	let debuggerId=aboutDoubt.debuggerId;
	let debuggerName=aboutDoubt.debuggerName;
	let time=new Date().toLocaleTimeString();
    let date=new Date().toLocaleDateString();

	

	const sendMessage=()=>{

		

		let newMessage={

			receiverId:debuggerId,
			receiverName:debuggerName,
			senderId:studentId,
			
			senderName:studentName,
			message:message,
			sentTime:time,
			sentDate:date,
	
	
	
	
		}
	
		console.log(newMessage);

	

		axios.post("http://localhost:9000/doubt/message/"+doubtId,newMessage)
		.then((data)=>{

			console.log("Message Sent Success");
			console.log(data);

		}).catch((err)=>{console.log("Error in sending Message");

		console.log(err);
	})

	}


	

	return (
		<>
			<Navbar />
			<MobileDoubtPage />
			<div className="doubtPage hidden md:grid">
				<div className="left">
					<div className="doubtPage_main">
						<div className="doubtPage_mainHead">JAVA DOUBT</div>
						<div className="doubtPage_mainBody">
							<Document />
							{/* <ScreenShare /> */}
						</div>
					</div>
					
				</div>
				<div className="right">
					<div className="doubtPage_chatHead">
						<img src="/userimg.jpg" alt="njn" />
						<p>Dhruv Pasricha</p>
					</div>
					<hr />
					<div className="doubtPage_messages">

						{allMessages.map( ( message)=>{ 

							
						

							// if(message.senderId==window.localStorage.getItem("userId"))
							return  <div  className={message.senderId==studentId?"message receiver":"message sender"}>
								<h5>{message.senderName}</h5>
							<p>{message.message}</p>
							<span className="time">{message.sentTime}</span>
							<br />
						</div>;
							

						

						} )}



						
					</div>
					<div className="sendMessage">
						<span
							className="iconify-inline"
							data-icon="akar-icons:attach"
							data-width="20"
							data-height="20"
						></span>
						<div className="inputBox">
							<input onChange={(e)=>{setMessage(e.target.value)}} className="send" type="text" placeholder="Write message..." />
							<div onClick={sendMessage}>
							<span 
								className="iconify-inline"
								data-icon="fluent:send-20-filled"
								data-width="20"
								data-height="20"
							></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DoubtPage;
