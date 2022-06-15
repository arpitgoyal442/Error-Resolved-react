import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import {callUser, handleRecieveCall, handleAnswer, handleNewICECandidateMsg, shareScreen} from "./WebRTCFunctions"

const ScreenShare = ({senders, userStream}) => {
  const doubtId = useParams().id;
  const userVideo = useRef();
	const partnerVideo = useRef();
	const peerRef = useRef();
	const socketRef = useRef();
	const otherUser = useRef();


  useEffect(() => {
		if (navigator.mediaDevices)
			navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
				// userVideo.current.srcObject = stream;
				userStream.current = stream;
				socketRef.current = io("https://kj-webrtc.herokuapp.com");
        socketRef.current.on("connect_error", (err) => {
          console.log(`connect_error due to ${err.message}`);
        });
				socketRef.current.emit("join room", doubtId);

				socketRef.current.on("other user", (userId) => {
					callUser(userId, peerRef, userStream, senders, socketRef, otherUser, partnerVideo);
					otherUser.current = userId;
				});

				socketRef.current.on("user joined", (userId) => {
					otherUser.current = userId;
				});

				socketRef.current.on("offer", (incoming) => handleRecieveCall(incoming, peerRef, userStream, senders, socketRef));

				socketRef.current.on("answer", (answer) => handleAnswer(answer, peerRef));

				socketRef.current.on("ice-candidate", (incoming) => handleNewICECandidateMsg(incoming, peerRef));
			});
	}, []);

  return (
    <div className='h-full grid place-items-center relative'>
			<div className="p-5 absolute aspect aspect-square h-40 bottom-4 right-4 bg-gray-300 rounded-full">
				<img className='rounded-full border' src="https://avatars.dicebear.com/api/avataaars/lorem.svg" alt="avatar" />
			</div>
			<video controls className='h-[calc(100%-2rem)] w-[calc(100%-2rem)] bg-gray-200 rounded-md' muted autoPlay ref={partnerVideo} />
			{/* <button onClick={shareScreen}>Share screen</button> */}
    </div>
  )
}

export default ScreenShare
