import { useState } from "react";
import Navbar from "../components/Navbar";
import ChevronRight from "@heroicons/react/solid/ChevronRightIcon";
import CameraIcon from "@heroicons/react/outline/CameraIcon";
import Modal from "../components/Modal";
import NameForm from "../components/profile/profileForms/NameForm";
import GenderForm from "../components/profile/profileForms/GenderForm";
import SkillsForm from "../components/profile/profileForms/SkillsForm";
import PhoneForm from "../components/profile/profileForms/PhoneForm";
import SocialForm from "../components/profile/profileForms/SocialForm";
import DoubtsChart from "../components/profile/DoubtsChart";
import TopicsChart from "../components/profile/TopicsChart";

const Profile = ({ type }) => {
	// type = "debugger" or "student"
	const [showModal, setShowModal] = useState(false),
		[FormComp, setFormComp] = useState(null);

	const openNameForm = () => {
		setFormComp(<NameForm setShowModal={setShowModal} />);
		setShowModal(true);
	};
	const openGenderForm = () => {
		setFormComp(<GenderForm setShowModal={setShowModal} />);
		setShowModal(true);
	};
	const openSkillsForm = () => {
		setFormComp(<SkillsForm setShowModal={setShowModal} />);
		setShowModal(true);
	};
	const openPhoneForm = () => {
		setFormComp(<PhoneForm setShowModal={setShowModal} />);
		setShowModal(true);
	};
	const openSocialForm = () => {
		setFormComp(<SocialForm setShowModal={setShowModal} />);
		setShowModal(true);
	};
	return (
		<div>
			<Navbar />
			<Modal showModal={showModal} setShowModal={setShowModal}>
				{FormComp}
			</Modal>
			<main className="p-2">
				<div className="text-center mb-8">
					<div className="z-0 group border-gray-400 border rounded-full mx-auto w-32 h-32 lg:w-40 lg:h-40 relative overflow-hidden">
						<img
							className="rounded-full w-full h-full"
							src="https://kashishj.me/icons/logo.png"
							alt="kashish jain"
						/>
						<div className="hidden group-hover:flex absolute bg-gray-500 bg-opacity-50 w-full h-1/3 bottom-0 items-center justify-center cursor-pointer">
							<CameraIcon className="h-6 w-6 lg:h-8 lg:w-8" />
						</div>
					</div>
					<h2 className="text-2xl mt-3">Welcome, Kashish Jain</h2>
					<p className="text-md text-gray-500 mt-1">
						Manage your info to make us work better for you.
					</p>
				</div>
				<div className={type === "debugger" ? "w-full flex flex-col md:flex-row gap-x-2" : ""}>
					<div className={type === "debugger" ? "md:w-1/2" : ""}>
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border-gray-400 border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Basic Info
							</h2>
							<div
								onClick={openNameForm}
								className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 hover:bg-gray-100 px-4 md:px-8 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Name
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<p className="flex-1">Kashish Jain</p>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
							<div
								onClick={openGenderForm}
								className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-gray-400 border-t hover:bg-gray-100 px-4 md:px-8 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Gender
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<p className="flex-1">Male</p>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
						</div>
						{type === "debugger" && (
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border-gray-400 border">
								<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
									Skills
								</h2>
								<div
									onClick={openSkillsForm}
									className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 hover:bg-gray-100 px-4 md:px-8 cursor-pointer"
								>
									<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
										Your Skills
									</p>
									<div className="flex-[0.75] flex items-center justify-between">
										<p className="max-h-12 overflow-y-scroll no-scrollbar flex-1">
											ReactJs, HTML, CSS, JavaScript, MongoDB, ExpressJs, NodeJs, C++,
											Firebase, MERN, ReactJs, HTML, CSS, JavaScript, MongoDB,
											ExpressJs, NodeJs, C++, Firebase, MERN
										</p>
										<ChevronRight className="h-6 w-6 flex-[0.1]" />
									</div>
								</div>
								<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-gray-400 border-t px-4 md:px-8">
									<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
										Endorsed
									</p>
									<p className="flex-[0.75]">ReactJs, HTML, CSS, JavaScript, MongoDB</p>
								</div>
							</div>
						)}
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border-gray-400 border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Contact Info
							</h2>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Email
								</p>
								<p className="flex-[0.75]">jainabhishek7204@gmail.com</p>
							</div>
							<div
								onClick={openPhoneForm}
								className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-gray-400 border-t hover:bg-gray-100 px-4 md:px-8 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Phone
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<p className="flex-1">+918570853624</p>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
						</div>
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border-gray-400 border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Social Media Handles
							</h2>
							<div
								onClick={openSocialForm}
								className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8 hover:bg-gray-100 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Linkedin
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<a
										href="https://linkedin.com/in/kashishjain04"
										target="_blank"
										rel="noopener noreferrer"
										className="w-max text-highlight font-medium"
									>
										kashishjain04
									</a>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
							<div
								onClick={openSocialForm}
								className="flex flex-col gap-y-1 border-gray-400 border-t md:flex-row md:items-center py-4 px-4 md:px-8 hover:bg-gray-100 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Github
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<a
										href="https://github.com/Kashishjain04"
										target="_blank"
										rel="noopener noreferrer"
										className="w-max text-highlight font-medium"
									>
										Kashishjain04
									</a>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
							<div
								onClick={openSocialForm}
								className="flex flex-col gap-y-1 border-gray-400 border-t md:flex-row md:items-center py-4 px-4 md:px-8 hover:bg-gray-100 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									StackOverflow
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<a
										href="https://stackoverflow.com/users/15934413"
										target="_blank"
										rel="noopener noreferrer"
										className="w-max text-highlight font-medium"
									>
										kashish-jain
									</a>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
							<div
								onClick={openSocialForm}
								className="flex flex-col gap-y-1 border-gray-400 border-t md:flex-row md:items-center py-4 px-4 md:px-8 hover:bg-gray-100 cursor-pointer"
							>
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Instagram
								</p>
								<div className="flex-[0.75] flex items-center justify-between">
									<a
										href="https://www.instagram.com/kashish_jain04"
										target="_blank"
										rel="noopener noreferrer"
										className="w-max text-highlight font-medium"
									>
										kashish_jain04
									</a>
									<ChevronRight className="h-6 w-6 flex-[0.1]" />
								</div>
							</div>
						</div>
					</div>
					{type === "debugger" && (
						<div className="md:w-1/2">
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 px-2 md:px-4 rounded-md border-gray-400 border">
								<h2 className="text-xl ml-2 md:ml-4 mb-2 underline underline-offset-4">
									Doubts Solved
								</h2>
								<DoubtsChart />
							</div>
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border-gray-400 border">
								<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
									Favourite Topics
								</h2>
								<TopicsChart />
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Profile;
