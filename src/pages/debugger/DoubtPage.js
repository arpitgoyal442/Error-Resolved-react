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

	const [message, setMessage] = useState("");

	let { aboutDoubt } = useLocation().state;

	// console.log(aboutDoubt);

	const [allMessages, setAllMessages] = useState([]);



	useEffect(() => {

		axios.get("http://localhost:9000/doubt/chats/" + aboutDoubt._id).then((data) => {

			console.log(data.data.chats);
			setAllMessages(data.data.chats)


		}).catch((err) => {
			console.log(err);
		})

		       var element = document.getElementsByClassName("doubtPage_messages")[0];
				console.log(element)
				element.scrollTop = element.scrollHeight;

	}, [])


	// What i want to send message  ->>   DoubtId , DebuggerId, DebuggerName , StudentId , StudentName


	let studentId = aboutDoubt.studentId;
	let studentName = aboutDoubt.studentName;
	let doubtId = aboutDoubt._id;
	let debuggerId = window.localStorage.getItem("userId");
	let debuggerName = window.localStorage.getItem("userName");
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();






	const sendMessage = () => {

		let newMessage = {

			receiverId: studentId,
			receiverName: studentName,
			senderId: debuggerId,

			senderName: debuggerName,
			message: message,
			sentTime: time,
			sentDate: date,

		}



		console.log(newMessage)


		axios.post("http://localhost:9000/doubt/message/" + doubtId, newMessage)
			.then((data) => {

				console.log("Message Sent Success");
				console.log(data);

				setMessage("");
				setAllMessages((pre) => [...pre, newMessage]);

				

				// console.log(element.scrollHeight);

			}).catch((err) => {
				console.log("Error in sending Message");

				console.log(err);
			})

			// var element = document.getElementsByClassName("doubtPage_messages")[0];
			// console.log(element)
			// element.scrollTo(0,element.scrollHeight );

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

						{allMessages.map((message) => {




							// if(message.senderId==window.localStorage.getItem("userId"))
							return <div className={message.senderId == debuggerId ? "message receiver" : "message sender"}>
								<h6>{message.senderName}</h6>
								<p>{message.message}</p>
								<span className="time">{message.sentTime}</span>
								<br />
							</div>;


							// else return  
							// <div className="message receiver">
							// 	<p>{message.message}</p>
							// 	<span className="time">{message.sentTime}</span>
							// </div>

						})}



						{/* <div className="date">{new Date().toLocaleDateString()}</div> */}
						{/* <div className="message sender">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>

						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div> */}
					</div>
					<div className="sendMessage">
						<span
							className="iconify-inline"
							data-icon="akar-icons:attach"
							data-width="20"
							data-height="20"
						></span>
						<div className="inputBox">
							<input value={message} onChange={(e) => { setMessage(e.target.value) }} className="send" type="text" placeholder="Write message..." />
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
