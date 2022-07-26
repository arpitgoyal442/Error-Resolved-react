
import { Link } from "react-router-dom";
function StudentDoubtCard({doubtInfo}) {

	return (
		<div className="studentDoubtCard">
			<p className="studentDoubtCard_date">{doubtInfo.postedTime}</p>
			<h4 className="studentDoubtCard_topic">{doubtInfo.topic}</h4>
			<ul className="studentDoubtCard_dropdown">
				<Link to="/student/doubt/123">
					<div>
					<span
						className="iconify-inline"
						data-icon="akar-icons:eye"
						
					></span>
					</div>
				</Link>
				<Link to="/student/edit/123" state={{aboutDoubt:doubtInfo}}>
					<div>
					<span
						className="iconify-inline"
						data-icon="ci:edit"
						
					></span>
					</div>
				</Link>
				<span
					className="iconify-inline"
					data-icon="fluent:delete-24-filled"
					s
				></span>
			</ul>
			<p className="studentDoubtCard_text">
				{doubtInfo.shortDescription}
			</p>
		</div>
	);
}

export default StudentDoubtCard;
