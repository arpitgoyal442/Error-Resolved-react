import ScreenShare from "../../components/doubtComponents/ScreenShare.js";
import MobileDoubtPage from "../../components/MobileDoubtPage.js";
import Navbar from "../../components/Navbar.js";
import Document from "../../components/doubtComponents/Document.js";





import { useLocation } from "react-router-dom";


import { useState } from "react";
import axios from "axios";
import { useEffect,useRef } from "react";
import { socket } from "../../socket.js";


import { URL } from "../../Globals/Constants.js";






const DoubtPage = () => {

	const scrollRef=useRef();

	const [message, setMessage] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	let { aboutDoubt } = useLocation().state;
	const [currentUser,setCurentUser]=useState(null);
	const[arriveMessage,setArriveMessage]=useState(null);

	



	useEffect(() => {

		setCurentUser(localStorage.getItem("userId"));
		axios.get(`${URL}/doubt/chats/${aboutDoubt._id}`).then((data) => {
			setAllMessages(data.data.chats);
		}).catch((err) => {
			console.log(err);
		})

		// eslint-disable-next-line
	}, [])

	useEffect(()=>{

		if(socket)
		{
			socket.emit("add-user",currentUser);
		}
	},[currentUser])



	useEffect(()=>{
               console.log("Socket here is "+socket)
		if(socket)
		{
			socket.on("msg-recieve",data=>{
				console.log("Message Received from sender");
				console.log(data);
				setArriveMessage(data);
			})
		}



	},[])


	useEffect(()=>{

		arriveMessage && setAllMessages((pre)=>[...pre,arriveMessage])


	},[arriveMessage])


	useEffect(()=>{

		
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });

	},[allMessages])




	let studentId = aboutDoubt.studentId;
	let studentName = aboutDoubt.studentName;
	let doubtId = aboutDoubt._id;
	let debuggerId = window.localStorage.getItem("userId");
	let debuggerName = window.localStorage.getItem("userName");

	let newmessage={

		receiverId: studentId,
			receiverName: studentName,
			senderId: debuggerId,

			senderName: debuggerName,
			message: "",
			sentTime: "",
			sentDate: new Date().toLocaleDateString()

	}



	const sendMessage = (e) => {



		e.preventDefault();

		if(message==="")
		return;

		newmessage.message=message;
		newmessage.sentTime=new Date().toLocaleTimeString();

		// let newMessage = {

		// 	receiverId: studentId,
		// 	receiverName: studentName,
		// 	senderId: debuggerId,

		// 	senderName: debuggerName,
		// 	message: message,
		// 	sentTime: new Date().toLocaleTimeString(),
		// 	sentDate: new Date().toLocaleDateString()

		// }


		

		
		axios.post(`${URL}/doubt/message/${doubtId}`, newmessage)
			.then((data) => {

				console.log("Message Sent Success");
				console.log(data);

				setAllMessages((pre)=>[...pre,newmessage]);

				socket.emit("send-msg",newmessage.receiverId,newmessage);

				setMessage("");

			}).catch((err) => {
				console.log("Error in sending Message");

				console.log(err);
			})



	}


	

	    

	return (
		<>
			<Navbar />
			<MobileDoubtPage aboutDoubt={aboutDoubt} />
			<div  className="doubtPage hidden md:grid">
				<div className="left">
					<div className="doubtPage_main">
						<div className="doubtPage_mainHead">{aboutDoubt.topic}</div>
						<div className="doubtPage_mainBody">
							{/* <Document /> */}
							{/* <ScreenShare /> */}
						
						</div>
					</div>

				</div>
				<div className="right">
					<div className="doubtPage_chatHead">
						<img src="/userimg.jpg" alt="njn" />
						<p>{aboutDoubt.studentName}</p>
					</div>
					<hr />
					<div   className="doubtPage_messages">

						{allMessages.map((message,index) => {




							// if(message.senderId==window.localStorage.getItem("userId"))
							return <div  ref={scrollRef} key={index} className={message.senderId == debuggerId ? "message receiver" : "message sender"}>
								<h6>{message.senderName}</h6>
								<p>{message.message}</p>
								<span className="time">{message.sentTime}</span>
								<br />
							</div>;



						})}


					</div>
					<div className="sendMessage">
						
						<div className="inputBox">
							<input   value={message} onChange={(e) => { setMessage(e.target.value) }} className="send" type="text" placeholder="Write message..." />
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
			</div>
		</>
	);
}

export default DoubtPage;
