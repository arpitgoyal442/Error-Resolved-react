import { useState } from "react";
import CameraIcon from "@heroicons/react/solid/VideoCameraIcon";
import MicIcon from "@heroicons/react/solid/MicrophoneIcon";
import ChatIcon from "@heroicons/react/solid/ChatAltIcon";
import AttachIcon from "@heroicons/react/solid/PaperClipIcon";
import XIcon from "@heroicons/react/solid/XIcon";
import Document from "./doubtComponents/Document";

const MobileDoubtPage = () => {
	const [showChat, setShowChat] = useState(false),
		[viewType, setViewType] = useState(1); // 1 = screen, 2 = code, 3 = document
	return (
		<>
			{showChat && <MobileChat closeChat={() => setShowChat(false)} />}
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

const MobileChat = ({ closeChat }) => {
	return (
		<div className="bg-light absolute top-0 left-0 w-screen h-screen pt-navbar flex flex-col">
			<div className="w-full bg-darkest py-2 px-4 flex items-center justify-between">
				<p className="font-semibold text-lg">Chat</p>
				<XIcon onClick={closeChat} className="h-4 w-4" />
			</div>
			{/* Messages */}
			<div className="flex flex-col flex-1"></div>
			{/* Input */}
			<div className="border-t border-t-black p-2 flex items-center space-x-2">
				<AttachIcon className="h-6 w-6" />
				<div className="bg-white rounded-full flex items-center flex-1 p-2 pl-4">
					<input className="flex-1 outline-none" type="text" placeholder="Write Message..." />
					<span
						className="iconify-inline"
						data-icon="fluent:send-20-filled"
						data-width="20"
						data-height="20"
					></span>
				</div>
			</div>
		</div>
	);
};
