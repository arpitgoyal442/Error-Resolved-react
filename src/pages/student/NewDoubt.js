import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { socket } from "../../socket";


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

	
	const navigate=useNavigate();

	
	
	
	const [language, setLanguage] = useState(topics[0]),
		[price, setPrice] = useState(),
		[screenshot, setScreenshot] = useState(null),
		[shortDesc, setShortDesc] = useState(""),
		[longDesc, setLongDesc] = useState("");

	const addDoubt=()=>{


		if( !price|| shortDesc.length===0||longDesc.length===0)
		{
			toast.warn('Missing Fields !!', {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				
				theme:"dark"
				});

				return;
		}

		const doubt={
			language:language,
			price:price,
			shortdes:shortDesc,
			longdes:longDesc,
			doubtfiles:screenshot
		}

		console.log(doubt);

		const studentId=window.localStorage.getItem("userId");
		const studentName=window.localStorage.getItem("userName");



		// --To Send Data On Backend  --START
		const myFormData=new FormData();

        if(screenshot)
		{
		for(let i=0;i<screenshot.length;i++)
		myFormData.append('myfiles',screenshot[i]);
		}


		myFormData.append('topic',language);
		myFormData.append('price',price);
		myFormData.append('shortDescription',shortDesc);
		myFormData.append('longDescription',longDesc);
		myFormData.append('studentId',studentId);
		myFormData.append('studentName',studentName);

		console.log(myFormData);
		
		axios.post("http://localhost:9000/doubt/add",myFormData
			
		).then((result)=>{

			
			socket.emit("add-doubt",result.data);

			toast('Added Successfully', {
				position: "bottom-right",
				autoClose: 1200,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				onClose:(e)=>{navigate('/student') },
				theme:"dark"
				});

				console.log(result);

				

				

			

		}).catch((err)=>{

			
			toast('Some Error Occured!', {
				position: "bottom-right",
				autoClose: 1200,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				
				theme:"dark"
				});

				

			console.log(err);
		})

		// ---END
	}


	return (
		<div className="addDoubt">
			<Navbar />
			<div className="addDoubt_body">
				<ToastContainer/>
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
						<textarea required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} cols="60" rows="2" maxLength={150}></textarea>
					</div>

					<div>
						<label className="addDoubt_heading">
							Long Description*
						</label>
						<textarea required value={longDesc} onChange={(e) => setLongDesc(e.target.value)} cols="60" rows="4"></textarea>
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
