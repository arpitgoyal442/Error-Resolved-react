import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signin from "./pages/signin.js";
import DebuggerHome from "./pages/debugger/NewHome.js";
import StudentHome from "./pages/student/Home.js";
import AddNewDoubt from "./pages/student/NewDoubt.js";

import Test from "./components/Test.js";
import Profile from "./pages/Profile.js";
import DoubtPage from "./pages/DoubtPage.js";

import DebuggerDoubtPage from "./pages/debugger/DoubtPage.js";
import StudentEditDoubt from "./pages/student/EditDoubt.js";
import Login2 from "./pages/Login2.js";
import NewAddDoubt from "./pages/student/NewAddDoubt.js";

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
import "./styles/login2.css";
import "./styles/test.css";
import "./styles/OurAdvantage.css";
import "./styles/SideModal.css";
import "./styles/student/NewAddDoubt.css";
import "./styles/debugger/NewDebuggerHome.css";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const userType = window.localStorage.getItem("userType");

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
				{!userType ? (
					<Route exact path="/" element={<Login2 />} />
				) : userType == 1 ? (
					<>
						<Route exact path="/" element={<Navigate to="/student" />} />
						<Route exact path="/student" element={<StudentHome />} />
						<Route exact path="/student/profile" element={<Profile type="student" />} />
						<Route exact path="/student/new-doubt" element={<AddNewDoubt />} />
						<Route exact path="/student/edit-doubt" element={<StudentEditDoubt />} />
						<Route exact path="/solve-doubt/:doubtId" element={<DoubtPage />} />
					</>
				) : (
					<>
						<Route exact path="/" element={<Navigate to="/debugger" />} />
						<Route exact path="/debugger" element={<DebuggerHome />} />
						<Route exact path="/debugger/profile" element={<Profile type="debugger" />} />
						<Route exact path="/solve-doubt/:doubtId" element={<DoubtPage />} />
					</>
				)}
				<Route path="*" element={<center><h1>404</h1></center>} />
				{/* <Route exact path="/debugger/solve-doubt/:doubtId" element={<DebuggerDoubtPage />} /> */}
				{/* <Route exact path="/test" element={<Test />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
