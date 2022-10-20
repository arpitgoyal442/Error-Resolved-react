import React from "react";

const NewDoubtCard = () => {
	return (
    <>
		<div className="p-4 flex w-full">
			{/* left */}
			<div className="pr-2 text-right">
				<p className="text-blue-700 font-medium">@Kashishjain04</p>
				<p className="text-gray-400">1 day ago</p>
				<p className="text-lg font-medium">₹ 999</p>
			</div>
      <div className="-my-4 w-[1.5px] bg-light flex-shrink-0"></div>
			{/* right */}
			<div className="flex-1 pl-2">
				<p className="text-blue-700 line-clamp-1 mb-1" >
					Lorem ipsum dolor sit, amet constur adipisicing elit. Ipsum, eum!
				</p>
				<p className="text-gray-500 line-clamp-2">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, laboriosam officia.
					Error tempore ullam atque minus et quidem qui accusamus, aperiam, ipsum omnis similique
					laudantium officiis deserunt ducimus molestias sapiente, quos nam quam impedit enim
					asperiores! Ratione nam officiis ad consequatur inventore labore repellat deleniti ducimus
					voluptatem officia ea earum, perspiciatis doloribus excepturi exercitationem molestiae
					rerum harum quod, dicta vero voluptates temporibus reprehenderit sed. Laudantium
					temporibus at officia dignissimos. Rerum accusamus mollitia nulla voluptas ducimus eaque
					culpa delectus adipisci dignissimos. Cumque error nostrum veritatis vel voluptatibus, ad
					nobis quae earum repellendus exercitationem? Veritatis nam sapiente aperiam reiciendis
					amet delectus rerum.
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
