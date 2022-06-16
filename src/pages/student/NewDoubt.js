import { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const topics = [
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
	"Java",
	"C++",
	"Python",
	"C",
	"Ruby",
	"Golang",
	"C++",
	"Python",
	"C",
	"BhaiLang",
	"Django",
	"Kubernetes",
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
];

function Add() {
	const [language, setLanguage] = useState(topics[0]),
		[difficulty, setDifficulty] = useState(1),
		[screenshot, setScreenshot] = useState(null),
		[shortDesc, setShortDesc] = useState(""),
		[longDesc, setLongDesc] = useState("");
	return (
		<div className="addDoubt">
			<Navbar />
			<div className="addDoubt_body">
				<h1 className="addDoubt_mainHead">Add Doubt</h1>

				<div className="addDoubt_form">
					<div className="addDoubt_language">
						<label className="addDoubt_heading">
							Language*
						</label>
						<div className="list">
							{topics.map((t, i) => (
								<p key={i} className={language===t?'active':undefined} onClick={() => setLanguage(t)}>{t}</p>
							))}
						</div>
					</div>
					<div className="addDoubt_difficulty">
						<label className="addDoubt_heading">
							Difficulty*
						</label>
						<div className="list">
							<p className={difficulty===1?'active':undefined} onClick={() => setDifficulty(1)}>Easy</p>
							<p className={difficulty===2?'active':undefined} onClick={() => setDifficulty(2)}>Medium</p>
							<p className={difficulty===3?'active':undefined} onClick={() => setDifficulty(3)}>Hard</p>
						</div>
					</div>

					<div>
						<label className="addDoubt_heading">
							Screenshot
						</label>
						<input type="file" onChange={(e) => setScreenshot(e.target.files[0])} />
					</div>

					<div>
						<label className="addDoubt_heading">
							Short Description*
						</label>
						<textarea required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} cols="30" rows="2" maxLength={50}></textarea>
					</div>

					<div>
						<label className="addDoubt_heading">
							Long Description*
						</label>
						<textarea required value={longDesc} onChange={(e) => setLongDesc(e.target.value)} cols="30" rows="4"></textarea>
					</div>

					<div className="addDoubt_btnParent">
						<button className="addDoubt_btn">Add</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Add;
