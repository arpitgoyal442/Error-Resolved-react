import {useState} from 'react'
const regex = /^[6-9]{1}[0-9]{9}$/;

const PhoneForm = ({setShowModal}) => {
  const [phone, setPhone] = useState(8570853624),
   [otp, setOtp] = useState(""),
   [formStatus, setFormStatus] = useState(1);

  const cancel = () => {
		setPhone(8570853624);
		setShowModal(false);
	};

  const sendOtp = () => {
    if(regex.exec(phone.toString())[0]!==phone.toString()) return alert("Invalid phone number format.")
    setFormStatus(2);
  }

  const submitForm = (e) => {
    e.preventDefault();
    formStatus===1 ? sendOtp() : null;
  }

  return (
    <form className="max-w-xl w-full p-4 rounded-lg border bg-white" onSubmit={submitForm}>
      <h2 className="text-xl font-medium -mx-4 px-4 pb-4 mb-4 border-b">Phone</h2>
      <div className="flex items-center gap-x-2 py-2 -mx-4 px-4">
				<p className="text-gray-500 uppercase flex-[0.3] text-xs">New Phone</p>
				<input
					className="outline-none flex-1 w-full"
					type="number"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
          required
				/>
			</div>
      {formStatus === 2 && <div className="flex items-center gap-x-2 py-2 -mx-4 px-4">
				<p className="text-gray-500 uppercase flex-[0.3] text-xs">OTP</p>
				<input
					className="border-b outline-none flex-1 w-full"
					type="number"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
          max="999999"
          autoFocus
          required
				/>
			</div>}
      <div className="border-t mt-2 pt-2 -mx-4 px-4 flex items-center justify-end gap-x-2">
				<button
					onClick={cancel}
					className="border border-highlight text-highlight px-3 py-1 rounded-lg hover:shadow-md"
				>
					Cancel
				</button>
				<button type="submit" className="bg-highlight text-white px-3 py-1 rounded-lg hover:shadow-md">
					{formStatus === 1 ? "Send OTP" : "Verify"}
				</button>
			</div>
    </form>
  )
}

export default PhoneForm
