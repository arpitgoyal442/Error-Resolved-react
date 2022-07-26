import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation } from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios";


const topics = [
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
	"Ruby",
	"Golang",
	"AWS",
	"BhaiLang",
	"Django",
	"Kubernetes",
	"Other"
	
	
];

function EditDoubt() {


	// ! How to show previous files !


	const [language, setLanguage] = useState(topics[1]),
	[price, setPrice] = useState(),
		
		[screenshot, setScreenshot] = useState(null),
		[shortDesc, setShortDesc] = useState(""),
		[longDesc, setLongDesc] = useState("");

		const location = useLocation()
		const { aboutDoubt} = location.state;
		console.log(aboutDoubt);

	
    useEffect(()=>{

	 setShortDesc(aboutDoubt.shortDescription);
	 setLongDesc(aboutDoubt.longDescription);
	 setLanguage(aboutDoubt.topic);
	 setPrice(aboutDoubt.price);
	
	// eslint-disable-next-line
	},[]);


	let onEditClick=()=>{
		

		console.log(screenshot);



		const doubt={
			language:language,
			price:price,
			shortdes:shortDesc,
			longdes:longDesc,
			
		}

		console.log(doubt);


		// --To Send Data On Backend  --START
		let myFormData=new FormData();

		
		if(screenshot!=null)
		{
		for(let i=0;i<screenshot.length;i++)
		myFormData.append('myfiles',screenshot[i]);
		}
		


       
		myFormData.append('topic',language);
		myFormData.append('price',price);
		myFormData.append('shortDescription',shortDesc);
		myFormData.append('longDescription',longDesc);

		console.log(myFormData);
		


		axios.put("http://localhost:9000/doubt/"+aboutDoubt._id,myFormData).then((d)=>{

		   


			console.log(d);
		}).catch(()=>{})






	}


		


	return (
		<div className="addDoubt">
			<Navbar />
			<div className="addDoubt_body">
				<h1 className="addDoubt_mainHead">Edit Doubt</h1>

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
							<input value={price}  onInput={(e)=>{ setPrice(e.target.value)}}  className="priceinput" type="number" placeholder="ex. 50"/>
							
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
						<textarea required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} cols="30" rows="2" maxLength={200}></textarea>
					</div>

					<div>
						<label className="addDoubt_heading">
							Long Description*
						</label>
						<textarea required value={longDesc} onChange={(e) => setLongDesc(e.target.value)} cols="30" rows="4"></textarea>
					</div>

					<div className="addDoubt_btnParent">
						<button onClick={onEditClick} className="editDoubt_btn">Update</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditDoubt;
