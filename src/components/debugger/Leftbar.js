const topics = [
	"Java",
	"C++",
	"C",
	"c#",
	"Node.js",
	
	"Ruby",
	"Python",
	
	"HTML",
	"CSS",
	
	
	
	"React.js",
	"Django",
	"Kubernetes",
	
	"Other"
	
	
];

function Leftbar({ sort, setSort, solvingNow, setSolvingNow, active, setActive, requested, setRequested, topic, setTopic }) {
	
  const filterTopic = (t) => {
    if (topic.includes(t)) {
      setTopic((prev) => prev.filter((top) => top !== t));
    }else{
      setTopic((prev) => [...prev, t]);
    }
  }
	return (
		<div className="leftbar">
			<p className="leftbar__filterHead">Sort By</p>
			<div className="leftbar__filterCat">
				<p onClick={() => setSort(1)} className={`leftbar__filter noselect ${sort === 1 && "active"}`}>
					Time Posted
				</p>
				<p onClick={() => setSort(2)} className={`leftbar__filter noselect ${sort === 2 && "active"}`}>
					Price
				</p>
			</div>
			<hr />
			<hr />
			<p className="leftbar__filterHead">Solving Now</p>
			<div className="leftbar__filterCat">
				<p onClick={() => setSolvingNow(true)} className={`leftbar__filter noselect ${solvingNow && "active"}`}>True</p>
				<p onClick={() => setSolvingNow(false)} className={`leftbar__filter noselect ${!solvingNow && "active"}`}>False</p>
			</div>
			<hr />
			<p className="leftbar__filterHead">Active</p>
			<div className="leftbar__filterCat">
				<p onClick={() => setActive(active===1 ? 0 : 1)} className={`leftbar__filter noselect ${active === 1 && "active"}`}>True</p>
				<p onClick={() => setActive(active===-1 ? 0 : -1)} className={`leftbar__filter noselect ${active === -1 && "active"}`}>False</p>
			</div>
			<hr />
			<p className="leftbar__filterHead">Requested</p>
			<div className="leftbar__filterCat">
				<p onClick={() => setRequested(requested===1 ? 0 : 1)} className={`leftbar__filter noselect ${requested === 1 && "active"}`}>True</p>
				<p onClick={() => setRequested(requested===-1 ? 0 : -1)} className={`leftbar__filter noselect ${requested === -1 && "active"}`}>False</p>
			</div>
			<hr />
			<p className="leftbar__filterHead">Topic</p>
			<div className="leftbar__filterCat language">
				{topics.map((t,i) => (
					<p key={i} onClick={() => filterTopic(t)} className={`leftbar__filter noselect ${topic.includes(t) && "active"}`}>{t}</p>
				))}
			</div>
		</div>
	);
}

export default Leftbar;
