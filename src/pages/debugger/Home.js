import Navbar from "../../components/Navbar.js"
import Leftbar from "../../components/debugger/Leftbar";
import DoubtCard from "../../components/debugger/DoubtCard";
import { useState,useEffect } from "react";
import Filters from "../../components/debugger/Filters";
import axios from "axios";
import StudentDoubtCard from "../../components/student/DoubtCard.js";



function DebuggerHome() {

	

	const [doubts,setDoubts]=useState([]);                    // To Store all doubts
	const [requestedDoubts,setRequestedDoubts]=useState([]);  // To store already Requested Doubts
	const [sort, setSort] = useState(1),
		[solvingNow, setSolvingNow] = useState(false),
		[active, setActive] = useState(0),
		[requested, setRequested] = useState(0),
		[topic, setTopic] = useState([]),
		[showModal, setShowModal] = useState(false);

	useEffect(()=>{

		// Fetch all Doubts
		let userId=window.localStorage.getItem("userId")

		axios.get("http://localhost:9000/doubt/all",{params:{sort:sort,active:active,requested:requested,topic:topic,solvingNow:solvingNow,topics:topic,debuggerId:userId}})
		.then((data)=>{
			console.log(data.data);
			setDoubts(data.data);
		})
		.catch((err)=>{console.log("Unable to Fetch Doubts"); console.log(err)});


		// Fetch doubts already requested by this debugger
		
		axios.get("http://localhost:9000/debugger/profile/"+userId)
		.then( 
			data=>{
				console.log(data.data.requestedDoubts);
				 setRequestedDoubts(data.data.requestedDoubts);
			}
		)
		.catch(err=>{console.log(err)});     
		
	},[active,topic,requested,solvingNow,sort]);

	
	
	return (
		<>
			<Navbar />
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



                         
						{    doubts.map(doubt=>{

                             
							return <DoubtCard aboutDoubt={doubt}
							 isRequested={  ( requestedDoubts.includes(doubt._id) )?true:false }
							  solvingNow={(doubt.debuggerId===window.localStorage.getItem("userId"))?true:false}
							   />

						})}

						{/* {solvingNow && doubts.map(doubt=>
						{

						return  <StudentDoubtCard doubtInfo={doubt}/>
						})} */}


					</div>
				</div>
			</div>
		</>
	);
}

export default DebuggerHome;
