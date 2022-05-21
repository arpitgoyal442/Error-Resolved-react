import { useState } from "react";
import Modal from "../Modal";

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
	"Node.js",
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
	"Django",
	"Kubernetes",
	"Java",
	"C++",
	"Python",
	"C",
	"Node.js",
];

const Filters = ({ sort, setSort, solvingNow, setSolvingNow, active, setActive, requested, setRequested, topic, setTopic }) => {
	const [showModal, setShowModal] = useState(false);

	const filterTopic = (t) => {
		if (topic.includes(t)) {
			setTopic((prev) => prev.filter((top) => top !== t));
		} else {
			setTopic((prev) => [...prev, t]);
		}
	};

	return (
		<div className="debuggerFilters">
			<div className="debuggerFilters__icon" onClick={() => setShowModal(true)}>
				<span className="iconify" data-icon="ep:filter"></span>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<div className="debuggerFilters__modal">
					<div className="debuggerFilters__cat">
						<p className="debuggerFilters__subhead">Sort By</p>
						<div className="debuggerFilters__options">
							<button onClick={() => setSort(1)} className={sort === 1 && "active"}>
								Time Posted
							</button>
							<button onClick={() => setSort(2)} className={sort === 2 && "active"}>
								Price
							</button>
						</div>
					</div>
					<hr />
					<hr />
					<div className="debuggerFilters__cat">
						<p className="debuggerFilters__subhead">Solving Now</p>
						<div className="debuggerFilters__options">
							<button
								onClick={() => setSolvingNow(true)}
								className={solvingNow && "active"}
							>
								True
							</button>
							<button
								onClick={() => setSolvingNow(false)}
								className={!solvingNow && "active"}
							>
								False
							</button>
						</div>
					</div>
					<hr />
					<div className="debuggerFilters__cat">
						<p className="debuggerFilters__subhead">Active</p>
						<div className="debuggerFilters__options">
							<button
								onClick={() => setActive(active === 1 ? 0 : 1)}
								className={active === 1 && "active"}
							>
								True
							</button>
							<button
								onClick={() => setActive(active === -1 ? 0 : -1)}
								className={active === -1 && "active"}
							>
								False
							</button>
						</div>
					</div>
					<hr />
					<div className="debuggerFilters__cat">
						<p className="debuggerFilters__subhead">Requested</p>
						<div className="debuggerFilters__options">
							<button
								onClick={() => setRequested(requested === 1 ? 0 : 1)}
								className={requested === 1 && "active"}
							>
								True
							</button>
							<button
								onClick={() => setRequested(requested === -1 ? 0 : -1)}
								className={requested === -1 && "active"}
							>
								False
							</button>
						</div>
					</div>
					<hr />
					<div className="debuggerFilters__cat">
						<p className="debuggerFilters__subhead">Topic</p>
						<div className="debuggerFilters__options language">
							{topics.map((t, i) => (
								<button
									onClick={() => filterTopic(t)}
									key={i}
									className={topic.includes(t) && "active"}
								>
									{t}
								</button>
							))}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Filters;
