import { useState } from "react";

const NameForm = ({ setShowModal }) => {
	const [first, setFirst] = useState("Kashish"),
		[last, setLast] = useState("Jain");

	const cancel = () => {
		setFirst("Kashish");
		setLast("Jain");
		setShowModal(false);
	};

	return (
		<form className="max-w-xl w-full p-4 rounded-lg border bg-white" onSubmit={(e) => e.preventDefault()}>
			<h2 className="text-xl font-medium -mx-4 px-4 pb-4 mb-4 border-b">Change Name</h2>
			<div className="flex items-center gap-x-2 py-2 border-b -mx-4 px-4">
				<p className="text-gray-500 uppercase flex-[0.3] text-xs">First Name</p>
				<input
					className="outline-none flex-1 w-full"
					type="text"
					value={first}
					onChange={(e) => setFirst(e.target.value)}
          required
				/>
			</div>
			<div className="flex items-center gap-x-2 py-2 border-b -mx-4 px-4">
				<p className="text-gray-500 uppercase flex-[0.3] text-xs">Last Name</p>
				<input
					className="outline-none flex-1 w-full"
					type="text"
					value={last}
					onChange={(e) => setLast(e.target.value)}
          required
				/>
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-2">
				<button
					onClick={cancel}
					className="border border-highlight text-highlight px-3 py-1 rounded-lg hover:shadow-md"
				>
					Cancel
				</button>
				<button type="submit" className="bg-highlight text-white px-3 py-1 rounded-lg hover:shadow-md">Save</button>
			</div>
		</form>
	);
};

export default NameForm;
