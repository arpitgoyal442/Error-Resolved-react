import { useState } from "react";

const SocialForm = ({ setShowModal }) => {
	const [linkedin, setLinkedin] = useState({
			userName: "kashishjain04",
			profileUrl: "",
		}),
		[github, setGithub] = useState({
			userName: "Kashishjain04",
			profileUrl: "",
		}),
		[stackOverflow, setStackOverflow] = useState({
			userName: "kashish-jain",
			profileUrl: "",
		}),
		[instagram, setInstagram] = useState({
			userName: "kashish_jain04",
			profileUrl: "",
		});

	const cancel = () => {
		setLinkedin({
			userName: "",
			profileUrl: "",
		});
		setGithub({
			userName: "",
			profileUrl: "",
		});
		setStackOverflow({
			userName: "",
			profileUrl: "",
		});
		setInstagram({
			userName: "",
			profileUrl: "",
		});
		setShowModal(false);
	};

	return (
		<form className="max-w-xl w-full p-4 rounded-lg border bg-white" onSubmit={(e) => e.preventDefault()}>
			<h2 className="text-xl font-medium -mx-4 px-4 pb-4 mb-4 border-b">Social Media Handles</h2>
			<div className="py-2 border-b -mx-4 px-4">
				<p className="uppercase text-sm mb-1 font-medium">Linkedin</p>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">UserName</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={linkedin.userName}
						onChange={(e) => setLinkedin((prev) => ({ ...prev, userName: e.target.value }))}
						required
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">Profile URL</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={linkedin.profileUrl}
						onChange={(e) => setLinkedin((prev) => ({ ...prev, profileUrl: e.target.value }))}
						required
					/>
				</div>
			</div>
			<div className="py-2 border-b -mx-4 px-4">
				<p className="uppercase text-sm mb-1 font-medium">Github</p>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">UserName</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={github.userName}
						onChange={(e) => setGithub((prev) => ({ ...prev, userName: e.target.value }))}
						required
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">Profile URL</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={github.profileUrl}
						onChange={(e) => setGithub((prev) => ({ ...prev, profileUrl: e.target.value }))}
						required
					/>
				</div>
			</div>
			<div className="py-2 border-b -mx-4 px-4">
				<p className="uppercase text-sm mb-1 font-medium">StackOverflow</p>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">UserName</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={stackOverflow.userName}
						onChange={(e) => setStackOverflow((prev) => ({ ...prev, userName: e.target.value }))}
						required
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">Profile URL</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={stackOverflow.profileUrl}
						onChange={(e) =>
							setStackOverflow((prev) => ({ ...prev, profileUrl: e.target.value }))
						}
						required
					/>
				</div>
			</div>
			<div className="py-2 border-b -mx-4 px-4">
				<p className="uppercase text-sm mb-1 font-medium">Instagram</p>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">UserName</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={instagram.userName}
						onChange={(e) => setInstagram((prev) => ({ ...prev, userName: e.target.value }))}
						required
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<p className="text-gray-500 uppercase flex-[0.3] text-xs">Profile URL</p>
					<input
						className="outline-none flex-1 w-full"
						type="text"
						value={instagram.profileUrl}
						onChange={(e) => setInstagram((prev) => ({ ...prev, profileUrl: e.target.value }))}
						required
					/>
				</div>
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-2">
				<button
					onClick={cancel}
					className="border border-highlight text-highlight px-3 py-1 rounded-lg hover:shadow-md"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="bg-highlight text-white px-3 py-1 rounded-lg hover:shadow-md"
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default SocialForm;
