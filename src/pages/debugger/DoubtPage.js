import { EditorState } from "draft-js";
import {useState} from "react";
import Document from "../../components/doubtComponents/Document.js";
import MobileDoubtPage from "../../components/MobileDoubtPage.js";
import Navbar from "../../components/Navbar.js";
import Test from "../../components/Test.js"
import Example from "../test.js";

function DoubtPage() {
	const [codeEditing, setCodeEditing] = useState(false);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [codeString, setCodeString] = useState("\n");
	return (
		<>
			<Navbar />
			<MobileDoubtPage />
			<div className="doubtPage hidden md:grid">
				<div className="left">
					<div className="doubtPage_main">
						<div className="doubtPage_mainHead">JAVA DOUBT</div>
						<div className="doubtPage_mainBody">
							{/* <Document /> */}
							{codeEditing ? <Test editorState={editorState} setEditorState={setEditorState} setCodeString={setCodeString} codeString={codeString} setCodeEditing={setCodeEditing} /> : <Example codeString={codeString} setCodeEditing={setCodeEditing} />}
						</div>
					</div>
					<div className="left_footer">
						<span
							className="iconify-inline"
							data-icon="wpf:video-call"
							data-width="30"
							data-height="30"
						/>
						<span
							className="iconify-inline active"
							data-icon="wpf:video-call"
							data-width="30"
							data-height="30"
						/>
						<span
							className="iconify-inline"
							data-icon="wpf:video-call"
							data-width="30"
							data-height="30"
						/>
					</div>
				</div>
				<div className="right">
					<div className="doubtPage_chatHead">
						<img src="/userimg.jpg" alt="njn" />
						<p>Dhruv Pasricha</p>
					</div>
					<hr />
					<div className="doubtPage_messages">
						<div className="date">{new Date().toLocaleDateString()}</div>
						<div className="message sender">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message sender">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="date">{new Date().toLocaleDateString()}</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message sender">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
						<div className="message receiver">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quas!</p>
							<span className="time">{new Date().toLocaleTimeString()}</span>
						</div>
					</div>
					<div className="sendMessage">
						<span
							className="iconify-inline"
							data-icon="akar-icons:attach"
							data-width="20"
							data-height="20"
						></span>
						<div className="inputBox">
							<input className="send" type="text" placeholder="Write message..." />
							<span
								className="iconify-inline"
								data-icon="fluent:send-20-filled"
								data-width="20"
								data-height="20"
							></span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DoubtPage;
