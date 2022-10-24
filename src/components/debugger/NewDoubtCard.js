import React from "react";
import { useState } from "react";
import { Icon } from '@iconify/react';
import SideModal from "../SideModal";

const NewDoubtCard = ({doubt,index}) => {


	
	
	console.log(doubt?doubt:"");

	const show=()=>{

		

			console.log(document.getElementsByClassName("sideModal")[index].classList)
			document.getElementsByClassName("sideModal")[index].classList.remove("hideModal");
			document.getElementsByClassName("sideModal")[index].classList.add("showModal");
			
	
	}

	return (
    <>
		<div   className="p-4 flex w-full newdoubtcard">
			<SideModal doubt={doubt} index={index}  />
			{/* left */}
			<div  className="pr-2 text-right newdoubtcard_left">
				<p className="text-blue-700 font-medium">{doubt.studentName}</p>
				<p className="text-gray-400">1 day ago</p>
				<p className="text-lg font-medium">₹ {doubt.price}</p>
				<p style={{marginLeft:"80%"}}>
				<Icon icon="dashicons:welcome-learn-more" color="gray" width="25" height="25" /> </p>
			</div>
      <div className="-my-4 w-[1.5px] bg-light flex-shrink-0 newdoubtcard_right"></div>
			{/* right */}
			<div className="flex-1 pl-2">
				<p  onClick={show} className="text-blue-700 line-clamp-1 mb-1 doubt_topic" >

					{doubt.topic}

					{/* Lorem ipsum dolor sit, amet constur adipisicing elit. Ipsum, eum! */}
				</p>
				<p className="text-gray-500 line-clamp-2">
					{doubt.shortDescription}
					{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, laboriosam officia.
					Error tempore ullam atque minus et quidem qui accusamus, aperiam, ipsum omnis similique
					laudantium officiis deserunt ducimus molestias sapiente, quos nam quam impedit enim
					asperiores! Ratione nam officiis ad consequatur inventore labore repellat deleniti ducimus
					voluptatem officia ea earum, perspiciatis doloribus excepturi exercitationem molestiae
					rerum harum quod, dicta vero voluptates temporibus reprehenderit sed. Laudantium
					temporibus at officia dignissimos. Rerum accusamus mollitia nulla voluptas ducimus eaque
					culpa delectus adipisci dignissimos. Cumque error nostrum veritatis vel voluptatibus, ad
					nobis quae earum repellendus exercitationem? Veritatis nam sapiente aperiam reiciendis
					amet delectus rerum. */}
				</p>
        <div className="flex flex-wrap gap-2 mt-2">
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
