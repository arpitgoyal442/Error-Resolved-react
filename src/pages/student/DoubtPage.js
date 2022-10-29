import ScreenShare from "../../components/doubtComponents/ScreenShare.js";
import MobileDoubtPage from "../../components/MobileDoubtPage.js";
import Navbar from "../../components/Navbar.js";
import Document from "../../components/doubtComponents/Document.js";

import { useLocation } from "react-router-dom";


import { useState } from "react";
import axios from "axios";
import { useEffect,useRef } from "react";
import { Icon } from '@iconify/react';


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
			
			console.log("outside msg-received")
			socket.on("msg-recieve",data=>{

				console.log("Message received is "+data)

				
				setArriveMessage(data);
				// console.log(data)
			})
		}



	},[])

	useEffect(()=>{

		if(socket)
		{
			socket.emit("add-user",currentUser);
		}


	},[currentUser])


	useEffect(()=>{

		arriveMessage && setAllMessages((pre)=>[...pre,arriveMessage]);

		


	},[arriveMessage])


	useEffect(()=>{

		
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });

	},[allMessages])




	

	let studentId=aboutDoubt.studentId;
	let studentName=aboutDoubt.studentName;
	let doubtId=aboutDoubt._id;
	let debuggerId=aboutDoubt.debuggerId;
	let debuggerName=aboutDoubt.debuggerName;
	let newMessage={

		receiverId:debuggerId,
		receiverName:debuggerName,
		senderId:studentId,
		
		senderName:studentName,
		message:"",
		sentTime:new Date().toLocaleTimeString(),
		sentDate:new Date().toLocaleDateString()

	}
	

	

	const sendMessage=(e)=>{

		e.preventDefault();

		newMessage.message=message;
		newMessage.sentTime=new Date().toLocaleTimeString();

		
	
		

	
		

		axios.post(`${URL}/doubt/message/${doubtId}`,newMessage)
		.then((data)=>{

			console.log("Message Sent Success");
			console.log(data);
			setAllMessages((pre)=>[...pre,newMessage]);
			socket.emit("send-msg",newMessage.receiverId,newMessage);

			setMessage("");

		}).catch((err)=>{console.log("Error in sending Message");

		console.log(err);
	})

	}


	

	return (
		<>
			<Navbar />
			<MobileDoubtPage aboutDoubt={aboutDoubt} />
			<div className="doubtPage hidden md:grid">
				<div className="left">
					<div className="doubtPage_main">
						<div className="doubtPage_mainHead">{aboutDoubt.topic}</div>
						<div className="doubtPage_mainBody">
							{/* <Document /> */}
							<ScreenShare />
						</div>
					</div>
					
				</div>
				<div className="right">
					<div className="doubtPage_chatHead">
						<img src="/userimg.jpg" alt="njn" />
						<p>{aboutDoubt.debuggerName}</p>
					</div>
					<hr />
					<div className="doubtPage_messages">

						{allMessages.map( ( message,index)=>{ 

							
						

							
							return  <div ref={scrollRef} key={index}  className={message.senderId==studentId?"message receiver":"message sender"}>
								<h5>{message.senderName}</h5>
							<p>{message.message}</p>
							<span className="time">{message.sentTime}</span>
							<br />
						</div>;
							

						

						} )}



						
					</div>
					<div className="sendMessage">
						
						<div className="inputBox">
							<input value={message} onChange={(e)=>{setMessage(e.target.value)}} className="send" type="text" placeholder="Write message..." />
							<div onClick={sendMessage}>
							<span 
								className="iconify-inline"
								data-icon="fluent:send-20-filled"
								data-width="20"
								data-height="20"
							></span>
							</div>
							<div className="doneAndPay">
							<Icon icon="mdi:cash-check" color="darkgreen" width="35" height="35" />
							<span className="doneAndPay_tooltip">Resolve And Pay</span>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DoubtPage;
