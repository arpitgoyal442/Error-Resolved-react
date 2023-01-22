import React from "react";
import { useState } from "react";
import { Icon } from '@iconify/react';
import SideModal from "../SideModal";
import { useNavigate} from "react-router-dom";

const NewDoubtCard = ({doubt,solvingNow}) => {

	const navigate=useNavigate();


	

	const show=()=>{
			 document.getElementById(doubt._id).classList.remove("hideModal");
			 document.getElementById(doubt._id).classList.add("showModal");	
	
	}

	const enterToSolve=()=>{
		navigate(`/solve-doubt/${doubt._id}` ,{state:{aboutDoubt:doubt}});
	}


	return (
    <   >
		<div    className="p-4 flex w-full newdoubtcard">
			<SideModal doubt={doubt}   />
			{/* left */}
			<div  className="pr-2 text-right newdoubtcard_left">
				<p className="text-blue-700 font-medium">{doubt.studentName}</p>
				<p className="text-gray-400">1 day ago</p>
				<p className="text-lg font-medium">₹ {doubt.price}</p>
				<p style={{marginLeft:"80%"}}>
				<Icon icon="dashicons:welcome-learn-more" color="gray" width="25" height="25" /> </p>
			</div>


      <div className="-my-4 w-[1.5px] bg-light flex-shrink-0 "></div>
			{/* right */}
			<div className="flex-1 pl-2 newdoubtcard_right">
				<p onClick={solvingNow?enterToSolve:show}   className="text-blue-700 line-clamp-1 mb-1 doubt_topic" >

					{doubt.topic}

					{/* Lorem ipsum dolor sit, amet constur adipisicing elit. Ipsum, eum! */}
				</p>
				<p className="text-gray-500  line-clamp-2 newDoubtCard_shortDesc break-all">
					{doubt.shortDescription}
					
				</p>
        <div className="flex flex-wrap  gap-2 mt-2">
          <p className="text-sm py-0.5 px-2 rounded-md bg-green-500/30">Learning</p>
          <p className="text-sm py-0.5 px-2 rounded-md bg-red-500/30">Python</p>
          <p className="text-sm py-0.5 px-2 rounded-md bg-red-500/30">C++</p>
          <p className="text-sm py-0.5 px-2 rounded-md bg-red-500/30 line-clamp-1">Data Structuures</p>
        </div>
			</div>
		</div>
    <hr className="-mx-6" />
    </>
	);
};

export default NewDoubtCard;
