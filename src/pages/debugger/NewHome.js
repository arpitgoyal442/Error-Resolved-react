import React from "react";
import FilterIcon from "@heroicons/react/outline/FilterIcon";
import NewDoubtCard from "../../components/debugger/NewDoubtCard";
import Navbar from "../../components/Navbar";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "../../Globals/Constants.js"


const DebuggerPage = () => {


	const [doubts, setDoubts] = useState([]);
	const [sort, setSort] = useState(1),
		[solvingNow, setSolvingNow] = useState(false),
		[active, setActive] = useState(0),
		[requested, setRequested] = useState(0),
		[topic, setTopic] = useState([]),

		[currentUser, setCurrentUser] = useState(null);

	const [showAllDoubts, setShowAllDoubts] = useState(true);




	useEffect(() => {

		setCurrentUser(localStorage.getItem("userId"));

		// Fetch all Doubts
		let userId = window.localStorage.getItem("userId")

		axios.get(`${URL}/doubt/all`, { params: { sort: sort, active: active, requested: requested, topic: topic, solvingNow: solvingNow, topics: topic, debuggerId: userId } })
			.then((data) => {
				console.log(data.data);

				// Pending : Remove Doubts which are posted by this debugger(when he was loggedin as student)

				setDoubts(data.data);

			})
			.catch((err) => { console.log("Unable to Fetch Doubts"); console.log(err) });


	}, [active, topic, requested, solvingNow, sort]);


	const allDoubtsClicked = (e) => {


		setShowAllDoubts(true);
		document.getElementsByClassName("currentlySolving")[0].style.color = "rgb(160, 158, 158)"
		document.getElementsByClassName("allDoubts")[0].style.color = "black"

		document.getElementsByClassName("allDoubts")[0].classList.add("newHome_subhead_highlight")

		

		document.getElementsByClassName("currentlySolving")[0].classList.remove("newHome_subhead_highlight") 




	}

	const currentlySolvingClicked = () => {

		setShowAllDoubts(false)

		document.getElementsByClassName("currentlySolving")[0].classList.add("newHome_subhead_highlight")

		document.getElementsByClassName("allDoubts")[0].classList.remove("newHome_subhead_highlight")

		

		 document.getElementsByClassName("currentlySolving")[0].style.color = "black"
		 document.getElementsByClassName("allDoubts")[0].style.color = "grey"

		 

	}


	return (
		<>
			<Navbar />


			<div>
				{/* <p className="solvingNow">Solving Currently </p>  */}

			</div>




			<div className="bg-white mx-auto w-screen max-w-4xl flex-1 py-4 px-6">



				<h1 onClick={allDoubtsClicked} className="text-xl sm:text-3xl font-medium sm:mb-2 -mx-2 xs:mx-0 sm:px-12 newHome_subhead  allDoubts newHome_subhead_highlight">All Doubts</h1>
				<h1 onClick={currentlySolvingClicked} className="text-xl sm:text-3xl font-medium sm:mb-2 -mx-2 xs:mx-0 sm:px-12   newHome_subhead currentlySolving ">Currently Solving</h1>

				<div className="flex items-center justify-between -mx-2 xs:mx-0 sm:px-12">
					<p className="sm:text-lg">{doubts.length} doubts</p>
					<div className="flex items-center space-x-4">
						<div className="border rounded-md hidden sm:flex">
							<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md border-r">
								Newest
							</div>
							<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md border-r">
								High Rewards
							</div>
							<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md">Active</div>
						</div>
						<div className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-xs md:text-md border rounded-md">
							<FilterIcon className="h-4 sm:h-5 w-4 sm:w-5" />
							<p>Filters</p>
						</div>
					</div>
				</div>
				<hr className="mt-5 -mx-6 " />
				<div >

                         {/* <h1>fjgbjinfrwe { showAllDoubts?"yes":"No"} sdfsidg</h1> */}

					{showAllDoubts && doubts.map( doubt => {


                           

						return <NewDoubtCard key={doubt._id} doubt={doubt}  solvingNow={false} />
					})}

					{!showAllDoubts && doubts.map( doubt => {


                              console.log(doubt.debuggerId+" ----"+window.localStorage.getItem("userId"))
						     return doubt.debuggerId==window.localStorage.getItem("userId") &&  <NewDoubtCard key={doubt._id} doubt={doubt}  solvingNow={true} />

						 
					})}





				</div>
			</div>
		</>
	);
};

export default DebuggerPage;
