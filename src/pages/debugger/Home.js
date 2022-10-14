import Navbar from "../../components/Navbar.js"
import Leftbar from "../../components/debugger/Leftbar";
import DoubtCard from "../../components/debugger/DoubtCard";
import { useState,useEffect } from "react";
import Filters from "../../components/debugger/Filters";
import axios from "axios";
import StudentDoubtCard from "../../components/student/DoubtCard.js";
import { socket } from "../../socket.js";

import {URL} from "../../Globals/Constants.js"




function DebuggerHome() {


	


	const [doubts,setDoubts]=useState([]);                    // To Store all doubts
	const [requestedDoubts,setRequestedDoubts]=useState([]);  // To store already Requested Doubts
	const [sort, setSort] = useState(1),
		[solvingNow, setSolvingNow] = useState(false),
		[active, setActive] = useState(0),
		[requested, setRequested] = useState(0),
		[topic, setTopic] = useState([]),
		[showModal, setShowModal] = useState(false),
		[deletedDoubts,setDeletedDoubts]=useState([]),
		[debuggerName,setDebuggerName]=useState(""),
		[currentUser,setCurrentUser]=useState(null);

		

	


	useEffect( ()=>{

		setCurrentUser(localStorage.getItem("userId"));

		// Fetch all Doubts
		let userId=window.localStorage.getItem("userId")

		 axios.get(`${URL}/doubt/all`,{params:{sort:sort,active:active,requested:requested,topic:topic,solvingNow:solvingNow,topics:topic,debuggerId:userId}})
		.then((data)=>{
			console.log(data.data);

			// Pending : Remove Doubts which are posted by this debugger(when he was loggedin as student)
             
			setDoubts(data.data);
			
		})
		.catch((err)=>{console.log("Unable to Fetch Doubts"); console.log(err)});

		
	},[active,topic,requested,solvingNow,sort]);

	// TO Fetch all the doubts  which are already requested by debugger
	useEffect(()=>{
		let userId=window.localStorage.getItem("userId")

		axios.get(`${URL}/debugger/profile/`+userId)
		.then( 
			data=>{
				console.log(data.data.requestedDoubts);
				setDebuggerName(data.data.name);
				 setRequestedDoubts(data.data.requestedDoubts);
			}
		)
		.catch(err=>{console.log(err)}); 
	},[requested])


	useEffect(()=>{

		

		if(socket)
		{
			// To get doubt deletion updates
			socket.on("deleted-doubt",(doubtInfo)=>{
				setDeletedDoubts((pre)=>[...pre,doubtInfo._id]);
			});


			// To Added newly added doubt Live 
			socket.on("added-doubt",(doubt)=>{
				setDoubts((pre)=>[...pre,doubt]);
			})



		}

	},[]);


	useEffect(()=>{

		if(socket)
		{
			socket.emit("add-user",currentUser);
		}


	},[currentUser])




	
	
	return (
		<>
			<Navbar  />


			<div className="debuggerHome">
				<Filters
					sort={sort}
					setSort={setSort}
					solvingNow={solvingNow}
					setSolvingNow={setSolvingNow}
					active={active}
					setActive={setActive}
					requested={requested}
					setRequested={setRequested}
					topic={topic}
					setTopic={setTopic}
				/>
				<div className="debuggerHome_body">
					<Leftbar
						sort={sort}
						setSort={setSort}
						solvingNow={solvingNow}
						setSolvingNow={setSolvingNow}
						active={active}
						setActive={setActive}
						requested={requested}
						setRequested={setRequested}
						topic={topic}
						setTopic={setTopic}
					/>
					  
					<div onClick={() => setShowModal(true)} className="debuggerHome_doubtsContainer">

                         
						{    doubts.map( (doubt,index)=>{

							if(deletedDoubts.includes(doubt._id)==false)
							{

                             
							 return <DoubtCard  aboutDoubt={doubt} debuggerName={debuggerName}
							
							  key={index}  
							 isRequested={  ( requestedDoubts.includes(doubt._id) )?true:false }
							  solvingNow={(doubt.debuggerId===window.localStorage.getItem("userId"))?true:false}
							   />
							}

						})}

						


					</div>
				</div>
			</div>
		</>
	);
}

export default DebuggerHome;
