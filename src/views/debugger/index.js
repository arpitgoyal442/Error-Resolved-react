import Navbar from "../../components/Navbar.js"
import Leftbar from "../../components/debugger/Leftbar";
import DoubtCard from "../../components/debugger/DoubtCard";
import { useState } from "react";
import Filters from "../../components/debugger/Filters";

function DebuggerHome() {
	/*
		sort: 1->time, 2->price
		solvingNow: false, true
		active: -1->false, 0->all, 1->true
		requested: -1->false, 0->all, 1->true
		topic: array of strings
	*/
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
						<DoubtCard status="active" />
						<DoubtCard />
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
						<DoubtCard />
					</div>
				</div>
			</div>
		</>
	);
}

export default DebuggerHome;
