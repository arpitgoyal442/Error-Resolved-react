import React, { useEffect, useRef, useState } from "react";
import { createSocketConnectionInstance } from "../../utils/connection";
import CameraIcon from "@heroicons/react/solid/VideoCameraIcon";
import MicIcon from "@heroicons/react/solid/MicrophoneIcon";
import DesktopComputerIcon from "@heroicons/react/solid/DesktopComputerIcon";
import { socket } from "../../socket";

//

import Peer from "peerjs"
//

const ScreenShare = ({receiverId}) => {


	// console.log("Receiver id is"+receiverId)


	const [peerId, setPeerId] = useState(null);
	const remoteVideoRef = useRef(null);
	const peerInstance=useRef(null);
	const currentUserMediaRef=useRef(null);
  
	const[remotePeerIdValue,setRemotePeerIdValue]=useState('')

    
	useEffect(() => {
  
	  const peer = new Peer();
	  peer.on('open', function (id) {
		setPeerId(id);

		// Emitting the current PeerId so that remote user can have this id
		if(socket)
		{
			  console.log("As refresh i am sending the peer id as : "+ id)
              socket.emit("peerId",{peerId:id,receiverUserId:receiverId});
		}

	  });


  
	  peer.on('call',(call)=>{

		console.log("inside getting call")
		
		var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
		getUserMedia({audio:true,video:true},(mediaStream)=>{
  
		  currentUserMediaRef.current.srcObject=mediaStream;
		currentUserMediaRef.current.play();
  

		
		  if( window.confirm("Accept Video Call ?"))
		  {
		  call.answer(mediaStream);
		  call.on('stream',(remoteStream)=>{
  
			remoteVideoRef.current.srcObject = remoteStream;
			remoteVideoRef.current.play();
  
  
  
		  })
		}
		})
  
  
  
  
  
	  })
	  
  
  
	  peerInstance.current=peer;


	  if(socket)
		{
			console.log("inside if of socket listener")
			socket.on("remotePeerId",data=>{
				console.log("Message Received from sender");
				console.log(data);
				setRemotePeerIdValue(data.remotePeerId);

				console.log("remote Peer Id is"+data.remotePeerId)
				
			})
		}
  
  
	}, [socket])
  
  
  
	const call = () => {
  
	  let remotePeerId=remotePeerIdValue;

	//   console.log("inside Call"+remotePeerIdValue)
	  
  
	  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	  getUserMedia({ video: true, audio: true   }, function (mediaStream) {
  
		currentUserMediaRef.current.srcObject=mediaStream;
		currentUserMediaRef.current.play();
  
		var call = peerInstance.current.call(remotePeerId, mediaStream);
  
		call.on('stream', function (remoteStream) {
		  remoteVideoRef.current.srcObject = remoteStream;
		  remoteVideoRef.current.play();
		});
	  }, function (err) {
		console.log('Failed to get local stream', err);
	  });
  
  
	}
  
  
	console.log(peerId);
	
	

	return (
		<div className="h-full flex flex-col">
			
			<div className="flex-1 grid place-items-center relative p-4">
			
				<div className="z-10 absolute aspect aspect-square h-40 bottom-4 right-4 bg-gray-300 rounded-full">
				
					{/* <img className='rounded-full border' src="https://avatars.dicebear.com/api/avataaars/lorem.svg" alt="avatar" /> */}
					<video  ref={currentUserMediaRef}   className="h-full w-full rounded-full"  />
				</div>
				<video
					className="h-full max-h-[100%] overflow-hidden bg-gray-200 rounded-md"
					ref={remoteVideoRef}
					
					
				/>
			</div>
			<div className="h-16 flex items-center justify-center space-x-6">
				<div className="bg-highlight p-2 rounded-full">
					<CameraIcon className="h-6 w-6 cursor-pointer" onClick={call} />
				</div>
				<div className="bg-highlight p-2 rounded-full">
					<MicIcon className="h-6 w-6 cursor-pointer" />
				</div>
				<div className="bg-highlight p-2 rounded-full">
				{/* <input type="text" value={remotePeerIdValue} onChange={e=>{setRemotePeerIdValue(e.target.value)}} /> */}
					{/* <DesktopComputerIcon onClick={() => toggleScreenShare(mediaType ? "userMedia" : "displayMedia")} className="h-6 w-6 cursor-pointer" /> */}
				</div>
			</div>
		</div>
	);
};

export default ScreenShare;
