import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import PlusIcon from "@heroicons/react/solid/PlusIcon";
import DoubtCard from "../../components/student/DoubtCard";
import { useEffect } from "react";
import axios from "axios";

function StudentHome() {
	const [status, setStatus] = useState(1);
	// 1 -> all, 2 -> pending, 3 -> unresolved, 4 -> resolved
	const [filter, setFilter] = useState(1);

	const [allDoubts,setAllDoubts]=useState([]);

	useEffect(()=>{

		let studentId=window.localStorage.getItem("userId");

		axios.get("http://localhost:9000/student/doubts/"+studentId)
		.then((data)=>{

			setAllDoubts(data.data);
			console.log(data.data);

		})
		.catch((err)=>{console.log(err)})

	},[])

	return (
		<>
			<Navbar />
			<main className="studentHome">
				{/* mobile-view options panel */}
				<div className="studentMobile">
					<Link to="/student/new-doubt">
						<div className="newDoubt">
							<PlusIcon height={"1.5rem"} width={"1.5rem"} />
							<p>New Doubt</p>
						</div>
					</Link>
					<div className="filters">
						<div onClick={() => setFilter(1)} className={`filter_btn ${filter===1 && "active"}`}>All</div>
						<div onClick={() => setFilter(2)} className={`filter_btn ${filter===2 && "active"}`}>Pending</div>
						<div onClick={() => setFilter(3)} className={`filter_btn ${filter===3 && "active"}`}>Unresolved</div>
						<div onClick={() => setFilter(4)} className={`filter_btn ${filter===4 && "active"}`}>Resolved</div>
					</div>
				</div>
				{/* left */}
				<div className="studentLeft">
				<Link to="/student/new-doubt">
						<div className="newDoubt">
							<PlusIcon height={"1.5rem"} width={"1.5rem"} />
							<p>New Doubt</p>
						</div>
					 </Link> 
					<div className="filters">
						<button
							onClick={() => setFilter(1)}
							className={`filter_btn ${filter === 1 && "active"}`}
						>
							All
						</button>
						<button
							onClick={() => setFilter(2)}
							className={`filter_btn ${filter === 2 && "active"}`}
						>
							Pending
						</button>
						<button
							onClick={() => setFilter(3)}
							className={`filter_btn ${filter === 3 && "active"}`}
						>
							Unresolved
						</button>
						<button
							onClick={() => setFilter(4)}
							className={`filter_btn ${filter === 4 && "active"}`}
						>
							Resolved
						</button>
					</div>
				</div>
				{/* right */}
				<div className="studentRight">
					<div className="doubtCards">

						{allDoubts.map((doubt)=>{
							return <DoubtCard doubtInfo={doubt} />
						})}



						
						
					</div>
				</div>
			</main>
		</>
	);
}

export default StudentHome;