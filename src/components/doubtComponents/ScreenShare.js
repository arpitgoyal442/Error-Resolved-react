import React, { useEffect, useRef, useState } from "react";
import { createSocketConnectionInstance } from "../../utils/connection";
import CameraIcon from "@heroicons/react/solid/VideoCameraIcon";
import MicIcon from "@heroicons/react/solid/MicrophoneIcon";
import DesktopComputerIcon from "@heroicons/react/solid/DesktopComputerIcon";

const ScreenShare = () => {
	const [mediaType, setMediaType] = useState(false);
	let socketInstance = useRef(null);
	const userVideo = useRef(null),
		partnerVideo = useRef(null);
	useEffect(() => {
		if (userVideo.current && partnerVideo.current) startConnection();
	}, []);
	const startConnection = () => {
		const params = { quality: 15 };
		if (!socketInstance.current)
			socketInstance.current = createSocketConnectionInstance({ params }, userVideo, partnerVideo);
	};
	const disconnectHandler = (props) => {
		socketInstance.current?.destroyConnection();
		props.history.push("/");
	};
	const toggleScreenShare = (displayStream) => {
		const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
		displayStream === "displayMedia" &&
			toggleVideoTrack({
				video: false,
				audio: true,
			});
		reInitializeStream(displayStream !== "displayMedia", true, displayStream).then(() => {
			setMediaType((prev) => !prev);
		});
	};
	useEffect(() => {
		console.log(userVideo.current?.src)
	}, [userVideo.current])
	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 grid place-items-center relative p-4">
				<div className="z-10 absolute aspect aspect-square h-40 bottom-4 right-4 bg-gray-300 rounded-full">
					{/* <img className='rounded-full border' src="https://avatars.dicebear.com/api/avataaars/lorem.svg" alt="avatar" /> */}
					<video src="/video.mp4" className="h-full w-full rounded-full" muted autoPlay ref={userVideo} />
				</div>
				<video
					className="h-full max-h-[100%] overflow-hidden bg-gray-200 rounded-md"
					muted
					autoPlay
					ref={partnerVideo}
				/>
			</div>
			<div className="h-16 flex items-center justify-center space-x-6">
				<div className="bg-highlight p-2 rounded-full">
					<CameraIcon className="h-6 w-6 cursor-pointer" />
				</div>
				<div className="bg-highlight p-2 rounded-full">
					<MicIcon className="h-6 w-6 cursor-pointer" />
				</div>
				<div className="bg-highlight p-2 rounded-full">
					<DesktopComputerIcon onClick={() => toggleScreenShare(mediaType ? "userMedia" : "displayMedia")} className="h-6 w-6 cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default ScreenShare;
