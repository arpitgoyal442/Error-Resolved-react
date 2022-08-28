import openSocket from "socket.io-client";
import Peer from "peerjs";

import {URL} from "../Globals/Constants.js"

let socketInstance = null;
let peers = {};

const initializePeerConnection = () => {
	return new Peer({ host: "peerjs-server.herokuapp.com", secure: true, port: 443 });
};
const initializeSocketConnection = () => {
	return openSocket.connect(URL, {
		secure: true,
		reconnection: true,
		rejectUnauthorized: false,
		reconnectionAttempts: 10,
	});
};
class Connection {
	videoContainer = {};
	message = [];
	settings;
	streaming = false;
	myPeer;
	socket;
	socketId = "";
	userId = "";
	userVideoRef;
	partnerVideoRef;
	constructor(userId, settings, userVideoRef, partnerVideoRef) {
		this.userId = userId;
		this.userVideoRef = userVideoRef;
		this.partnerVideoRef = partnerVideoRef;
		this.settings = settings;
		this.myPeer = initializePeerConnection();
		this.socket = initializeSocketConnection();
		this.initializeSocketEvents();
		this.initializePeersEvents();
	}
	initializeSocketEvents = () => {
		this.socket.on("connect", () => {
			// console.log("socket connected");
		});
		this.socket.on("user-disconnected", (socketId) => {
			console.log("user disconnected-- closing peers", socketId);
			peers[socketId] && peers[socketId].close();
			this.removeVideo(socketId);
		});
		this.socket.on("disconnect", () => {
			console.log("socket disconnected --");
		});
		this.socket.on("error", (err) => {
			console.log("socket error --", err);
		});
	};
	initializePeersEvents = () => {
		this.myPeer.on("open", (id) => {
			this.socketId = id;
			const roomID = window.location.pathname.split("/")[3];
			const userData = {
				socketId: id,
				roomID,
				userId: this.userId
			};
			// console.log("peers established and joined room", userData);
			this.socket.emit("join-room", userData);
			this.setNavigatorToStream();
		});
		this.myPeer.on("error", (err) => {
			console.log("peer connection error", err);
			this.myPeer.reconnect();
		});
	};
	setNavigatorToStream = () => {
		this.getVideoAudioStream().then((stream) => {
			if (stream) {
				this.streaming = true;
				this.createVideo({ id: this.socketId, stream });
				this.setPeersListeners(stream);
				this.newUserConnection(stream);
			}
		});
	};
	getVideoAudioStream = (video = true, audio = true) => {
		let quality = this.settings.params?.quality;
		if (quality) quality = parseInt(quality);
		const myNavigator =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia ||
			navigator.mediaDevices.msGetUserMedia;
		return myNavigator({
			video: video
				? {
						frameRate: quality ? quality : 12,
						noiseSuppression: true,
						width: { min: 640, ideal: 1280, max: 1920 },
						height: { min: 480, ideal: 720, max: 1080 },
				  }
				: false,
			audio: audio,
		});
	};
	createVideo = (createObj) => {
		if (createObj.id === this.socketId) {
			this.userVideoRef.current.srcObject = createObj.stream;
		} else {
			this.partnerVideoRef.current.srcObject = createObj.stream;
			this.partnerVideoRef.current.muted = false;
		}
	};
	setPeersListeners = (stream) => {
		console.log(stream)
		this.myPeer.on("call", (call) => {
			console.log("new call", call);
			call.answer(stream);
			call.on("stream", (userVideoStream) => {
				// console.log("user stream data", userVideoStream);
				this.createVideo({ id: call.metadata.id, stream: userVideoStream });
			});
			call.on("close", () => {
				console.log("closing peers listeners", call.metadata.id);
				this.removeVideo(call.metadata.id);
			});
			call.on("error", () => {
				console.log("peer error ------");
				this.removeVideo(call.metadata.id);
			});
			peers[call.metadata.id] = call;
		});
	};
	newUserConnection = (stream) => {
		this.socket.on("new-user-connect", (userData) => {
			// if(this.userId !== userData.userId)
			this.connectToNewUser(userData, stream);
		});
	};
	connectToNewUser(userData, stream) {
		const { socketId } = userData;
		const call = this.myPeer.call(socketId, stream, { metadata: { id: this.socketId } });
		call.on("stream", (userVideoStream) => {
			console.log("user stream data", userVideoStream);
			this.createVideo({ id: socketId, stream: userVideoStream, userData });
		});
		call.on("close", () => {
			console.log("closing new user", socketId);
			this.removeVideo(socketId);
		});
		call.on("error", () => {
			console.log("peer error ------");
			this.removeVideo(socketId);
		});
		peers[socketId] = call;
	}
	removeVideo = (id) => {
		delete this.videoContainer[id];
		const video = document.getElementById(id);
		if (video) video.remove();
	};
	destoryConnection = () => {
		const myMediaTracks = this.videoContainer[this.socketId]?.stream.getTracks();
		myMediaTracks?.forEach((track) => {
			track.stop();
		});
		socketInstance?.socket.disconnect();
		this.myPeer.destroy();
	};
	reInitializeStream = (video, audio, type = "userMedia") => {
		const media =
			type === "userMedia"
				? this.getVideoAudioStream(video, audio)
				: navigator.mediaDevices.getDisplayMedia();
		return new Promise((resolve) => {
			media.then((stream) => {
				if (type === "displayMedia") {
					this.toggleVideoTrack({ audio, video });
				}
				this.createVideo({ id: this.socketId, stream });
				this.replaceStream(stream);
				resolve(true);
			});
		});
	};
	getMyVideo = (id = this.socketId) => {
		return document.getElementById(id);
	};
	toggleVideoTrack = (status) => {
		const myVideo = this.getMyVideo();
		if (myVideo && !status.video)
			myVideo.srcObject?.getVideoTracks().forEach((track) => {
				if (track.kind === "video") {
					!status.video && track.stop();
				}
			});
		else if (myVideo) {
			this.reInitializeStream(status.video, status.audio);
		}
	};
	replaceStream = (mediaStream) => {
		// mediaStream.removeTrack(mediaStream.getTracks()[0]);
		Object.values(peers).forEach((peer) => {
			peer.peerConnection?.getSenders().forEach((sender) => {
				if (sender.track.kind === "audio") {
					if (mediaStream.getAudioTracks().length > 0) {
						sender.replaceTrack(mediaStream.getAudioTracks()[0]);
					}
				}
				if (sender.track.kind === "video") {
					if (mediaStream.getVideoTracks().length > 0) {
						sender.replaceTrack(mediaStream.getVideoTracks()[0]);
					}
				}
			});
		});
	};
}

export function createSocketConnectionInstance(userId = "", settings = {}, userVideo, partnerVideo) {
	return (socketInstance = new Connection(userId, settings, userVideo, partnerVideo));
}
