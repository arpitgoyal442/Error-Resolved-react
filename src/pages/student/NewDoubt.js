import { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const topics = [
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
	"c#",
	"Golang",
	"Python",
	"Javascript",
	"Ruby",
	"Golang",
	"C++",
	"Python",
	"Docker",
	"BhaiLang",
	"Django",
	"Kubernetes",
	"Java",
	"Php",
	"Python",
	"C",
	"Node.js",
	'Other'
];

function Add() {
	const [language, setLanguage] = useState(topics[0]),
		[price, setPrice] = useState(),
		[screenshot, setScreenshot] = useState(null),
		[shortDesc, setShortDesc] = useState(""),
		[longDesc, setLongDesc] = useState("");

	const addDoubt=()=>{

		console.log(price);
		  

		const doubt={
			language:language,
			price:price,
			shortdes:shortDesc,
			longdes:longDesc,
			doubtfiles:screenshot
		}

		console.log(doubt);



		// --To Send Data On Backend  --START
		const myFormData=new FormData();

		for(let i=0;i<screenshot.length;i++)
		myFormData.append('myfiles',screenshot[i]);


		myFormData.append('topic',language);
		myFormData.append('price',price);
		myFormData.append('shortDescription',shortDesc)
		myFormData.append('longDescription',longDesc)

		axios.post("http://localhost:9000/doubt/add",myFormData
			
		).then((result)=>{

			console.log(result);

		}).catch((err)=>{

			console.log(err);
		})

		// ---END
	}


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
						     Price*
						</label>
						<div className="list">
							<input  onInput={(e)=>{ setPrice(e.target.value)}}  className="priceinput" type="number" placeholder="ex. 50"/>
							
						</div>
					</div>

					<div>
						<label className="addDoubt_heading">
							Screenshot
						</label>
						<input multiple type="file" onChange={(e) => setScreenshot(e.target.files)} />
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
						<button onClick={addDoubt} className="addDoubt_btn">Add</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Add;
