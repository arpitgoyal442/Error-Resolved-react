import {useState} from "react";

const GenderForm = ({setShowModal}) => {
  const [gender, setGender] = useState("male");
  const cancel = () => {
		setGender("male");
		setShowModal(false);
	};
	return (
		<form className="max-w-xl w-full p-4 rounded-lg border bg-white" onSubmit={(e) => e.preventDefault()}>
			<h2 className="text-xl font-medium -mx-4 px-4 pb-4 mb-4 border-b">Gender</h2>
			<div className="flex flex-col gap-y-4">
				<div className="flex gap-x-4 items-center">
					<input className="cursor-pointer w-4 h-4" type="radio" name="gender" id="male" value={"male"} checked={gender==="male"} onChange={() => setGender("male")} required />
					<label className="cursor-pointer" htmlFor="male">Male</label>
				</div>
				<div className="flex gap-x-4 items-center">
					<input className="cursor-pointer w-4 h-4" type="radio" name="gender" id="female" value={"female"} onChange={() => setGender("female")} required />
					<label className="cursor-pointer" htmlFor="female">Female</label>
				</div>
				<div className="flex gap-x-4 items-center">
					<input className="cursor-pointer w-4 h-4" type="radio" name="gender" id="other" value={"other"} onChange={() => setGender("other")} required />
					<label className="cursor-pointer" htmlFor="other">Other</label>
				</div>
			</div>
      <div className="border-t mt-2 pt-2 -mx-4 px-4 flex items-center justify-end gap-x-2">
				<button
					onClick={cancel}
					className="border border-highlight text-highlight px-3 py-1 rounded-lg hover:shadow-md"
				>
					Cancel
				</button>
				<button type="submit" className="bg-highlight text-white px-3 py-1 rounded-lg hover:shadow-md">
					Save
				</button>
			</div>
		</form>
	);
};

export default GenderForm;
