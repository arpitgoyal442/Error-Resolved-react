import React from "react";
import FilterIcon from "@heroicons/react/outline/FilterIcon";
import NewDoubtCard from "../../components/debugger/NewDoubtCard";
import Navbar from "../../components/Navbar";
import SideModal from "../../components/SideModal";

const DebuggerPage = () => {
	return (
		<>
		<Navbar/>

		<SideModal/>

         {/* <div className="sideModal">
			dfdgf
		 </div> */}

		<div  className="bg-white mx-auto w-screen max-w-4xl flex-1 py-4 px-6">

			

			<h1 className="text-xl sm:text-3xl font-medium sm:mb-2 -mx-2 xs:mx-0 sm:px-12">All Doubts</h1>
			<div className="flex items-center justify-between -mx-2 xs:mx-0 sm:px-12">
				<p className="sm:text-lg">2,125 doubts</p>
				<div className="flex items-center space-x-4">
					<div className="border rounded-md hidden sm:flex">
						<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md border-r">
							Newest
						</div>
						<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md border-r">
							High Rewards
						</div>
						<div className="p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-sm md:text-md">Active</div>
					</div>
					<div className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 active:bg-light text-xs md:text-md border rounded-md">
            <FilterIcon className="h-4 sm:h-5 w-4 sm:w-5" />
						<p>Filters</p>
					</div>
				</div>
			</div>
      <hr className="mt-5 -mx-6 " />
      <div className="">
        <NewDoubtCard />
        <NewDoubtCard />
        <NewDoubtCard />
        <NewDoubtCard />
      </div>
		</div>
		</>
	);
};

export default DebuggerPage;
