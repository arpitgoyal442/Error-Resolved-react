export const callUser = (userId, peerRef, userStream, senders, socketRef, otherUser, partnerVideo) => {
  console.log("Calling")
	peerRef.current = createPeer(userId, peerRef, socketRef, otherUser, partnerVideo);
	userStream.current
		.getTracks()
		.forEach((track) => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
};

export const createPeer = (userId, peerRef, socketRef, otherUser, partnerVideo) => {
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
	peer.onicecandidate = (e) => handleICECandidateEvent(e, otherUser, socketRef);
	peer.ontrack = (e) => handleTrackEvent(e, partnerVideo);
	peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId, peerRef, socketRef);

	return peer;
};

export const handleNegotiationNeededEvent = (userId, peerRef, socketRef) => {
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

export const handleRecieveCall = (incoming, peerRef, userStream, senders, socketRef, partnerVideo, otherUser) => {
  console.log("Receiving")
	peerRef.current = createPeer(incoming.target, peerRef, socketRef, otherUser, partnerVideo);
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

export const handleAnswer = (message, peerRef) => {
	const desc = new RTCSessionDescription(message.sdp);
	peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
};

export const handleICECandidateEvent = (e, otherUser, socketRef) => {
	if (e.candidate) {
		const payload = {
			target: otherUser.current,
			candidate: e.candidate,
		};
		socketRef?.current?.emit("ice-candidate", payload);
	}
};

export const handleNewICECandidateMsg = (incoming, peerRef) => {
	const candidate = new RTCIceCandidate(incoming);
	peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
};

export const handleTrackEvent = (e, partnerVideo) => {
  if(partnerVideo?.current)
	  partnerVideo.current.srcObject = e.streams[0];
};

export const shareScreen = (senders, userStream) => {
  console.log("Sharing")
	if (navigator.mediaDevices)
		navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
			const screenTrack = stream.getTracks()[0];
			if (senders.current?.length)
				senders.current.find((sender) => sender.track.kind === "video").replaceTrack(screenTrack);
			console.log(senders.current)
			screenTrack.onended = function () {
				senders.current
					.find((sender) => sender.track.kind === "video")
					.replaceTrack(userStream.current.getTracks()[1]);
			};
		});
};
