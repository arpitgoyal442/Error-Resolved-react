import Head from "next/head";
import Navbar from "../../components/Navbar";
import StarFilled from "@heroicons/react/solid/StarIcon";
import StarEmpty from "@heroicons/react/outline/StarIcon";
import DoubtsChart from "../../components/profile/DoubtsChart";
import TopicsChart from "../../components/profile/TopicsChart";
import { useRouter } from "next/router";

const PublicProfile = () => {
	const router = useRouter();
	const { type } = router.query;
	// type === "1" ? "debugger" : "student"
	return (
		<div>
			<Head>
				<title>Public Profile | {type==="1" ? "Debugger" : "Student"}</title>
			</Head>
			<Navbar />
			<main className="p-2">
				<div className="text-center mb-8">
					<img
						className="border rounded-full mx-auto w-32 h-32 lg:w-40 lg:h-40"
						src="https://kashishj.me/icons/logo.png"
						alt="kashish jain"
					/>
					<h2 className="text-2xl mt-3">Kashish Jain</h2>
					<div className="mx-auto mt-2 flex gap-x-2 w-max">
						<StarFilled className="h-6 w-6 text-yellow-400" />
						<StarFilled className="h-6 w-6 text-yellow-400" />
						<StarFilled className="h-6 w-6 text-yellow-400" />
						<StarEmpty className="h-6 w-6 text-yellow-400" />
						<StarEmpty className="h-6 w-6 text-yellow-400" />
					</div>
				</div>
				<div className={type === "1" ? "w-full flex flex-col md:flex-row gap-x-2" : ""}>
					<div className={type === "1" ? "md:w-1/2" : ""}>
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Basic Info
							</h2>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Name
								</p>
								<p className="flex-1">Kashish Jain</p>
							</div>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-t px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Gender
								</p>
								<p className="flex-1">Male</p>
							</div>
						</div>
						{type === "1" && (
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border">
								<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
									Skills
								</h2>
								<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8">
									<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
										Your Skills
									</p>
									<p className="max-h-12 overflow-y-scroll no-scrollbar flex-1">
										ReactJs, HTML, CSS, JavaScript, MongoDB, ExpressJs, NodeJs, C++,
										Firebase, MERN, ReactJs, HTML, CSS, JavaScript, MongoDB, ExpressJs,
										NodeJs, C++, Firebase, MERN
									</p>
								</div>
								<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-t px-4 md:px-8">
									<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
										Endorsed
									</p>
									<p className="flex-1">ReactJs, HTML, CSS, JavaScript, MongoDB</p>
								</div>
							</div>
						)}
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Contact Info
							</h2>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Email
								</p>
								<p className="flex-1">jainabhishek7204@gmail.com</p>
							</div>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 border-t px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Phone
								</p>
								<p className="flex-1">+918570853624</p>
							</div>
						</div>
						<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border">
							<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
								Social Media Handles
							</h2>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Linkedin
								</p>
								<a
									href="https://linkedin.com/in/kashishjain04"
									target="_blank"
									rel="noopener noreferrer"
									className="w-max text-highlight font-medium"
								>
									kashishjain04
								</a>
							</div>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center border-t py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Github
								</p>
								<a
									href="https://github.com/Kashishjain04"
									target="_blank"
									rel="noopener noreferrer"
									className="w-max text-highlight font-medium"
								>
									Kashishjain04
								</a>
							</div>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center border-t py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									StackOverflow
								</p>
								<a
									href="https://stackoverflow.com/users/15934413"
									target="_blank"
									rel="noopener noreferrer"
									className="w-max text-highlight font-medium"
								>
									kashish-jain
								</a>
							</div>
							<div className="flex flex-col gap-y-1 md:flex-row md:items-center border-t py-4 px-4 md:px-8">
								<p className="flex-[0.25] text-xs font-medium text-gray-500 uppercase">
									Instagram
								</p>
								<a
									href="https://www.instagram.com/kashish_jain04"
									target="_blank"
									rel="noopener noreferrer"
									className="w-max text-highlight font-medium"
								>
									kashish_jain04
								</a>
							</div>
						</div>
					</div>
					{type === "1" && (
						<div className="md:w-1/2">
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 px-2 md:px-4 rounded-md border">
								<h2 className="text-xl ml-2 md:ml-4 mb-2 underline underline-offset-4">
									Doubts Solved
								</h2>
								<DoubtsChart />
							</div>
							<div className="overflow-hidden max-w-2xl mx-auto my-2 md:my-4 pt-4 rounded-md border">
								<h2 className="text-xl ml-4 md:ml-8 mb-2 underline underline-offset-4">
									Favourite Topics
								</h2>
								<TopicsChart />
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default PublicProfile;
