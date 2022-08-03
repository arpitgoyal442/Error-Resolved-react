import StarFilled from "@heroicons/react/solid/StarIcon";
import StarEmpty from "@heroicons/react/outline/StarIcon";

function notificationHandle({debuggerInfo}) {
	return (
		<div className="notificationHandle">
			<div className="notificationHandle_header">
				<img src="/userimg.jpg" alt="" />
				<div className="notificationHandle_header_right">
					<h1>{debuggerInfo.name}
					<div>
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarFilled className="h-6 w-6 text-yellow-400 star" />
							<StarEmpty className="h-6 w-6 text-yellow-400 star" />
							<StarEmpty className="h-6 w-6 text-yellow-400 star" />
						</div>
					</h1>
					
					<div className="notificationHandle_debuggerInfo">
						
						{/* <p> <b>Rating : </b>(4/5) <span className="iconify-inline" data-icon="ant-design:star-filled" style={{color:'rgb(60, 59, 5'}}></span></p> */}
						<p>
							<b>Speciality :</b> Java , c++ , Competitive programming
						</p>
						<p>
							<b>Total doubts solved:</b> 56
						</p>
					</div>
				</div>
			</div>
			<hr />

			<div className="notificationHandle_body">
				<h2>Doubt Description:</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
			</div>

			<div className="notificationHandle_footer">
				<button >Accept</button>
				<button>Decline</button>
			</div>
		</div>
	);
}

export default notificationHandle;
