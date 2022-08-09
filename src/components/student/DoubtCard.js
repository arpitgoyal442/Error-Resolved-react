
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StudentDoubtCard({doubtInfo}) {


	const onDeleteClick=()=>{

		axios.delete("http://localhost:9000/doubt/"+doubtInfo._id)
		.then(()=>{



			toast('Deleted Successfully', {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				onClose:()=>{window.location.href="http://localhost:3000/student"; },
				theme:"dark"
				});




		})
		.catch(()=>{

			toast.warn('Deletion Failed', {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			
				theme:"dark"
				});

		})

		

	
	}

	return (
		<div className="studentDoubtCard">
			<p className="studentDoubtCard_date">{doubtInfo.postedTime}</p>
			<h4 className="studentDoubtCard_topic">{doubtInfo.topic}</h4>
			<ToastContainer/>
			<ul className="studentDoubtCard_dropdown">
				<Link to="/student/solve-doubt" state={{aboutDoubt:doubtInfo}}>
					<div>
					<span
						className="iconify-inline"
						data-icon="akar-icons:eye"
						
					></span>
					</div>
				</Link>
				<Link to="/student/edit-doubt" state={{aboutDoubt:doubtInfo}}>
					<div>
					<span
						className="iconify-inline"
						data-icon="ci:edit"
						
					></span>
					</div>
				</Link>
				<div onClick={onDeleteClick}>
				<span 
					className="iconify-inline"
					data-icon="fluent:delete-24-filled"
					
				></span>
				</div>
			</ul>
			<p className="studentDoubtCard_text">
				{doubtInfo.shortDescription}
			</p>
		</div>
	);
}

export default StudentDoubtCard;
