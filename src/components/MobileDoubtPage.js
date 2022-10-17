import { useState, useEffect, useRef } from "react";
import CameraIcon from "@heroicons/react/solid/VideoCameraIcon";
import MicIcon from "@heroicons/react/solid/MicrophoneIcon";
import ChatIcon from "@heroicons/react/solid/ChatAltIcon";
import AttachIcon from "@heroicons/react/solid/PaperClipIcon";
import XIcon from "@heroicons/react/solid/XIcon";
import Document from "./doubtComponents/Document";
import axios from "axios";
import { socket } from "../socket";
import { URL } from "../Globals/Constants.js"


const MobileDoubtPage = ({ aboutDoubt }) => {

	// Trying

	




	const [showChat, setShowChat] = useState(false),
		[viewType, setViewType] = useState(1); // 1 = screen, 2 = code, 3 = document



	return (
		<>
			{showChat && <MobileChat  aboutDoubt={aboutDoubt} closeChat={() => setShowChat(false)} />}
			<div className="md:hidden p-3 flex h-[90vh] flex-col">
				{/* Topic */}
				<div className="rounded-md bg-darkest p-2 text-center font-semibold">Java Doubt</div>
				{/* Screen */}
				<div className="mt-4 flex-1">
					<div className="border-2 rounded-md w-full h-full bg-light">{viewType === 3 && <Document />}</div>
				</div>
				{/* View Options */}
				<div className="flex items-center justify-evenly mt-4 bg-light p-2 rounded-md">
					<p
						onClick={() => setViewType(1)}
						className={`border-b-highlight ${viewType === 1 && "border-b-2"}`}
					>
						Screen
					</p>
					<p
						onClick={() => setViewType(2)}
						className={`border-b-highlight ${viewType === 2 && "border-b-2"}`}
					>
						Code
					</p>
					<p
						onClick={() => setViewType(3)}
						className={`border-b-highlight ${viewType === 3 && "border-b-2"}`}
					>
						Document
					</p>
				</div>
				{/* Buttons */}
				<div className="p-2 flex items-center justify-center space-x-6 border-t mt-4 ">
					<div className="bg-highlight p-2 rounded-full">
						<CameraIcon className="h-6 w-6" />
					</div>
					<div className="bg-highlight p-2 rounded-full">
						<MicIcon className="h-6 w-6" />
					</div>
					<div onClick={() => setShowChat(true)} className="bg-highlight p-2 rounded-full">
						<ChatIcon className="h-6 w-6" />
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileDoubtPage;

const MobileChat = ({ aboutDoubt,closeChat }) => {



	//

	const scrollRef = useRef();

	const [message, setMessage] = useState("");
	const [allMessages,setAllMessages] = useState([]);

	const [currentUser, setCurentUser] = useState(null);
	const [arriveMessage, setArriveMessage] = useState(null);


	useEffect(() => {

		setCurentUser(localStorage.getItem("userId"));
		axios.get(`${URL}/doubt/chats/${aboutDoubt._id}`).then((data) => {
			setAllMessages(data.data.chats);
		}).catch((err) => {
			console.log(err);
		})

		// eslint-disable-next-line
	}, [])

	useEffect(() => {

		if (socket) {
			socket.emit("add-user", currentUser);
		}
	}, [currentUser])



	useEffect(() => {
		console.log("Socket here is " + socket)
		if (socket) {
			socket.on("msg-recieve", data => {
				console.log("Message Received from sender");
				console.log(data);
				setArriveMessage(data);
			})
		}



	}, [])


	useEffect(() => {

		arriveMessage && setAllMessages((pre) => [...pre, arriveMessage])


	}, [arriveMessage])


	useEffect(() => {


		scrollRef.current?.scrollIntoView({ behavior: "smooth" });

	}, [allMessages])

	let debuggerId=aboutDoubt.debuggerId;
	let debuggerName=aboutDoubt.debuggerName;


	let currentId=window.localStorage.getItem("userId");
	let studentId = aboutDoubt.studentId;
	let studentName = aboutDoubt.studentName;
	let doubtId = aboutDoubt._id;
	let receiverId= (currentId==studentId)?debuggerId:studentId;
	let receiverName= (currentId==studentId)?debuggerName:studentName;
	let senderName=(currentId==studentId)?studentName:debuggerName;

	


	let newMessage={

		   receiverId: receiverId,
			receiverName: receiverName,
			senderId: currentId,

			senderName:senderName ,
			message: message,
			sentTime: new Date().toLocaleTimeString(),
			sentDate: new Date().toLocaleDateString()

	}


	const sendMessage = (e) => {
		e.preventDefault();

		if (message === "")
			return;

			newMessage.message=message;
			newMessage.sentTime=new Date().toLocaleTimeString();
			newMessage.sentDate=new Date().toLocaleDateString();

		// let newMessage = {

		// 	receiverId: receiverId,
		// 	receiverName: receiverName,
		// 	senderId: currentId,

		// 	senderName:senderName ,
		// 	message: message,
		// 	sentTime: new Date().toLocaleTimeString(),
		// 	sentDate: new Date().toLocaleDateString()

		// }





		axios.post(`${URL}/doubt/message/${doubtId}`, newMessage)
			.then((data) => {

				console.log("Message Sent Success");
				console.log(data);

				setAllMessages((pre) => [...pre, newMessage]);

				socket.emit("send-msg", newMessage.receiverId, newMessage);

				setMessage("");

			}).catch((err) => {
				console.log("Error in sending Message");

				console.log(err);
			})



	}


	

	return (
		<div className="bg-light absolute top-0 left-0 w-screen h-screen pt-navbar flex flex-col">
			<div className="w-full bg-darkest py-2 px-4 flex items-center justify-between">
				<p className="font-semibold text-lg">Chat</p>
				<XIcon onClick={closeChat} className="h-4 w-4" />
			</div>
			{/* Messages */}
			<div className="flex flex-col flex-1 mobileMessages">

				{/*  */}

				{allMessages.map((message, index) => {




					// if(message.senderId==window.localStorage.getItem("userId"))
					return <div ref={scrollRef} key={index} className={message.senderId == currentId ? "mobileChatDiv mobileChat_receiver" : "mobileChatDiv mobileChat_sender"}>
						<h5>{message.senderName}</h5>
						<p>{message.message}</p>
						<span >{message.sentTime}</span>
						<br />
					</div>;

					



				})}



				


			</div>
			{/* Input */}
			<div className="border-t border-t-black p-2 flex items-center space-x-2">
				<AttachIcon className="h-6 w-6" />
				<div className="bg-white rounded-full flex items-center flex-1 p-2 pl-4">
					<input  value={message} onChange={(e) => { setMessage(e.target.value) }} className="flex-1 outline-none" type="text" placeholder="Write Message..." />
					<div  onClick={sendMessage}>
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
	);
};
