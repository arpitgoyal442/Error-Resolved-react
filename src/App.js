import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/signin.js";
import DebuggerHome from "./pages/debugger/Home.js";
import StudentHome from "./pages/student/Home.js";
import AddNewDoubt from "./pages/student/NewDoubt.js";
import StudentDoubtPage from "./pages/student/DoubtPage.js";
import Test from "./components/Test.js";
import Profile from "./pages/Profile.js";

import DebuggerDoubtPage from "./pages/debugger/DoubtPage.js";
import StudentEditDoubt from "./pages/student/EditDoubt.js";

import "./styles/Login.css";
import "./styles/Navbar.css";
import "./styles/variables.css";
import "./styles/DoubtContainer.css";
import "./styles/index.css";
import "./styles/RightChatBar.css";
import "./styles/DoubtPage.css";
import "./styles/Modal.css";
import "./styles/debugger/DoubtCard.css";
import "./styles/debugger/Leftbar.css";
import "./styles/debugger/DebuggerHome.css";
import "./styles/debugger/DebuggerFilters.css";
import "./styles/student/StudentHome.css";
import "./styles/student/StudentLeftbar.css";
import "./styles/student/StudentDoubtCard.css";
import "./styles/student/Filters.css";
import "./styles/student/NewDoubt.css";
import "./styles/debugger/DebuggerProfile.css";
import "./styles/UserChart.css";
import "./styles/debugger/DoubtModal.css";
import "./styles/student/NotificationHandle.css";
import "./styles/student/EditDoubt.css";
import "./styles/test.css";
import { useEffect } from "react";
import { gapi } from "gapi-script";

// Socket.io **START

import {io} from "socket.io-client";
const socket=io("http://localhost:5000");

socket.on("connect",()=>{

	console.log(socket.id);


});

socket.emit("chat",{name:"arpro"});

socket.on("chat",(payload)=>{

	console.log(payload);
})


// Socket.io **END

function App() {
	useEffect(() => {
		const start = () => {
			gapi.client.init({
				clientId: "742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com",
				scope: "email profile",
			});
		};
		gapi.load("client:auth2", start);
	});
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Signin />} />
				<Route exact path="/debugger" element={<DebuggerHome />} />
				<Route exact path="/student" element={<StudentHome />} />
				<Route exact path="/debugger/solve-doubt" element={<DebuggerDoubtPage />} />
				<Route exact path="/debugger/profile" element={<Profile type="debugger" />} />
				<Route exact path="/student/profile" element={<Profile type="student" />} />
				<Route exact path="/student/new-doubt" element={<AddNewDoubt />} />
				<Route exact path="/student/solve-doubt" element={<StudentDoubtPage />} />
				<Route exact path="/student/edit-doubt" element={<StudentEditDoubt />} />
				<Route exact path="/test" element={<Test />} />
			</Routes>
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
