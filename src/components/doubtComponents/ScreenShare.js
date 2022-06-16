import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
// import {callUser, handleRecieveCall, handleAnswer, handleNewICECandidateMsg, shareScreen} from "./WebRTCFunctions"

const ScreenShare = () => {
  const doubtId = useParams().id;
  const userVideo = useRef();
	const partnerVideo = useRef();
	const peerRef = useRef();
	const socketRef = useRef();
	const otherUser = useRef();
	const userStream = useRef();
	const senders = useRef([]);

  useEffect(() => {
		if (navigator.mediaDevices)
			navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
				userVideo.current.srcObject = stream;
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

				socketRef.current.on("offer", (incoming) => handleRecieveCall(incoming, peerRef, userStream, senders, socketRef, partnerVideo, otherUser));

				socketRef.current.on("answer", (answer) => handleAnswer(answer, peerRef));

				socketRef.current.on("ice-candidate", (incoming) => handleNewICECandidateMsg(incoming, peerRef));
			});
	}, []);

	const callUser = (userId) => {
		console.log("Calling")
		peerRef.current = createPeer(userId);
		userStream.current
			.getTracks()
			.forEach((track) => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
	};
	
	const createPeer = (userId) => {
		const peer = new RTCPeerConnection({
			iceServers: [
				{
					urls: "stun:stun.stunprotocol.org",
				},
				{
					urls: "turn:numb.viagenie.ca",
					credential: "muazkh",
					username: "webrtc@live.com",
				},
			],
		});
		peer.onicecandidate = handleICECandidateEvent;
		peer.ontrack = handleTrackEvent;
		peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId);
	
		return peer;
	};
	
	const handleNegotiationNeededEvent = (userId) => {
		peerRef.current
			.createOffer()
			.then((offer) => {
				return peerRef.current.setLocalDescription(offer);
			})
			.then(() => {
				const payload = {
					target: userId,
					caller: socketRef.current.id,
					sdp: peerRef.current.localDescription,
				};
				console.log(payload)
				socketRef.current.emit("offer", payload);
			})
			.catch((e) => console.log(e));
	};
	
	const handleRecieveCall = (incoming) => {
		console.log("Receiving")
		peerRef.current = createPeer();
		const desc = new RTCSessionDescription(incoming.sdp);
		peerRef.current
			.setRemoteDescription(desc)
			.then(() => {
				userStream.current
					.getTracks()
					.forEach((track) =>
						senders.current.push(peerRef.current.addTrack(track, userStream.current))
					);
			})
			.then(() => {
				return peerRef.current.createAnswer();
			})
			.then((answer) => {
				return peerRef.current.setLocalDescription(answer);
			})
			.then(() => {
				const payload = {
					target: incoming.caller,
					caller: socketRef.current.id,
					sdp: peerRef.current.localDescription,
				};
				socketRef.current.emit("answer", payload);
			});
	};
	
	const handleAnswer = (message) => {
		const desc = new RTCSessionDescription(message.sdp);
		peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
	};
	
	const handleICECandidateEvent = (e) => {
		if (e.candidate) {
			const payload = {
				target: otherUser.current,
				candidate: e.candidate,
			};
			socketRef?.current?.emit("ice-candidate", payload);
		}
	};
	
	const handleNewICECandidateMsg = (incoming) => {
		const candidate = new RTCIceCandidate(incoming);
		peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
	};
	
	const handleTrackEvent = (e) => {
		if(partnerVideo?.current)
			partnerVideo.current.srcObject = e.streams[0];
	};
	
	const shareScreen = () => {
		console.log("Sharing")
		if (navigator.mediaDevices)
			navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
				const screenTrack = stream.getTracks()[0];
				if (senders.current?.length)
					senders.current.find((sender) => sender.track.kind === "video").replaceTrack(screenTrack);
				screenTrack.onended = function () {
					senders.current
						.find((sender) => sender.track.kind === "video")
						.replaceTrack(userStream.current.getTracks()[1]);
				};
			});
	};
	

  return (
    <div className='h-full grid place-items-center relative'>
			<div className="z-10 p-0 absolute aspect aspect-square h-40 bottom-4 right-4 bg-gray-300 rounded-full">
				{/* <img className='rounded-full border' src="https://avatars.dicebear.com/api/avataaars/lorem.svg" alt="avatar" /> */}
				<video className='h-full w-full bg-gray-200 rounded-full' muted autoPlay ref={userVideo} />
			</div>
			<video controls className='h-[calc(100%-2rem)] w-[calc(100%-2rem)] bg-gray-200 rounded-md' muted autoPlay ref={partnerVideo} />
			<button onClick={shareScreen}>Share screen</button>
    </div>
  )
}

export default ScreenShare
