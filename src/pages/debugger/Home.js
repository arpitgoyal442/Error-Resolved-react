import Navbar from "../../components/Navbar.js"
import Leftbar from "../../components/debugger/Leftbar";
import DoubtCard from "../../components/debugger/DoubtCard";
import { useState,useEffect } from "react";
import Filters from "../../components/debugger/Filters";
import axios from "axios";



function DebuggerHome() {

	// Make 1 state variable of type array
	// Fetch all doubts after firt mounting of component
	// Fetch all requested doubt by debugger

	const [doubts,setDoubts]=useState([]);
	const [requestedDoubts,setRequestedDoubts]=useState([])

	useEffect(()=>{

		// Fetch all Doubts
		axios.get("http://localhost:9000/doubt/all")
		.then((data)=>{
			console.log(data.data);
			setDoubts(data.data);
		})
		.catch((err)=>{console.log("Unable to Fetch Doubts"); console.log(err)});


		// Fetch doubts already requested by this debugger
		let debuggerId=window.localStorage.getItem("userId");
		axios.get("http://localhost:9000/debugger/profile/"+debuggerId)
		.then( 
			data=>{
				console.log(data.data.requestedDoubts);
				 setRequestedDoubts(data.data.requestedDoubts);
			}
		)
		.catch(err=>{console.log(err)});

		

		     
		
	},[]);


	
	const [sort, setSort] = useState(1),
		[solvingNow, setSolvingNow] = useState(false),
		[active, setActive] = useState(0),
		[requested, setRequested] = useState(0),
		[topic, setTopic] = useState([]),
		[showModal, setShowModal] = useState(false);
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



						{doubts.map(doubt=>{

							return <DoubtCard aboutDoubt={doubt} isRequested={  ( requestedDoubts.includes(doubt._id) )?true:false } />

						})}



						{/* <DoubtCard status="active" /> */}
						{/* <DoubtCard />
						<DoubtCard  status="active"/>
						<DoubtCard />
						<DoubtCard status="active" />
						<DoubtCard />
						<DoubtCard />
						<DoubtCard status="active" />
						<DoubtCard />
						<DoubtCard status="active" />
						<DoubtCard />
						<DoubtCard />
						<DoubtCard />
						<DoubtCard /> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default DebuggerHome;
