import React, { useState, useEffect, useRef } from "react";
import BellIcon from "@heroicons/react/solid/BellIcon";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import UserIcon from "@heroicons/react/outline/UserIcon"

import DropdownContent from "./student/DropdownContent";
import { GoogleLogout } from 'react-google-login';
import axios from "axios";

import { socket } from "../socket";

import {URL,front_URL} from "../Globals/Constants.js"




function Navbar() {

	const [allNotifications, setAllNotifications] = useState([]);
	const [imageUrl, setImageUrl] = useState("");

	const [userData, setUserData] = useState();



	
	const [showNotification, setNotification] = useState(false),

		navRef = useRef(null);

	useEffect(() => {

		async function fetchUserProfile() {

			let userType = window.localStorage.getItem("userType");
			let userId = window.localStorage.getItem("userId");
			let fetchUrl = "";
			if (userType == 1)
				fetchUrl = `${URL}/student/profile/` + userId;

			else fetchUrl = `${URL}/debugger/profile/` + userId;




			let userProfile = await axios.get(fetchUrl).catch((err) => { return err; });

			// console.log("Notifications are: ")
			// console.log(userProfile.data.notifications);




			setAllNotifications(userProfile.data.notifications);
			setImageUrl(userProfile.data.imageUrl);




			let userData = {

				userId: userProfile.data._id,
				userName: userProfile.data.name
			}

			setUserData(userData);




		}

		fetchUserProfile();
	}, [])

	useEffect(() => {
		const unsubscribe = window.addEventListener("scroll", handleScroll);
		return unsubscribe;
	}, [])


	useEffect(()=>{


		socket.on("debugger-requesting",(data)=>{

			console.log("debugge-requesting socket");
			console.log(data)
			setAllNotifications((pre)=>[...pre,data])
		})

	},[])

	useEffect(()=>{

		socket.on("student-accept-request",(data)=>{

			console.log("student-accept-request");
			console.log(data)

			setAllNotifications((pre)=>[...pre,data]);
		})
	},[])

	const handleScroll = () => {
		if (window.scrollY > 0) navRef?.current?.classList?.add("navbar_shadow");
		else navRef?.current?.classList?.remove("navbar_shadow");
	}


	const onLogout = () => {

		window.localStorage.removeItem('userId')

		window.location.href = front_URL


	}


	return (
		<div className="navbar" ref={navRef}>
			<h2>
				<span>
					<del>ERROR:</del>&nbsp;
				</span>
				RESOLVED
			</h2>
			<div className="navbarIcons">

				<div className="dropdown" >

					<div  className="w-8 h-8 relative">
						<p className="grid place-items-center w-4 h-4 text-xs text-white font-semibold rounded-full bg-highlight absolute top-0 right-0 -translate-y-1/3">{allNotifications.length}</p>
						<BellIcon   className="bellIcon" />
					</div>

					<div
						className="dropdown-content "
						
					>
						<ul>

							{allNotifications.map((notification, index) => {

								return <li key={index}><DropdownContent   notification={notification} userData={userData} closeDropdown={() => setNotification(false)} /></li>

							})}

						</ul>
					</div>
				</div>

				<div className="dropdown">

					<div className=" navbar_profile">


						<img  src={imageUrl}  referrerPolicy="no-referrer"  alt="profile" />

					</div>

					<div className="dropdown-content">
						<ul>
							<div>
								<GoogleLogout
									clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
									// buttonText="Logout"
									render={renderProps => (
										<button onClick={renderProps.onClick} disabled={renderProps.disabled}><span onClick={onLogout} className="logouticon"> <LogoutIcon className="h-9 w-9 text-gray-500 logouticon" /> </span> Logout </button>
									)}
									onLogoutSuccess={onLogout}
								>
								</GoogleLogout>
								{/* <span onClick={onLogout} className="logouticon"> <LogoutIcon className="h-9 w-9 text-gray-500 logouticon"/> </span> Logout */}
							</div>

							<div>
								<span className="logouticon"> <UserIcon className="h-9 w-9 text-gray-500 logouticon" /> </span> Profile
							</div>

						</ul>
					</div>
				</div>

			</div>
		</div>
	);
}

export default Navbar;
