import React, { useState, useEffect, useRef } from "react";
import BellIcon from "@heroicons/react/solid/BellIcon";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import UserIcon from "@heroicons/react/outline/UserIcon"

import DropdownContent from "./student/DropdownContent";
import { GoogleLogout } from 'react-google-login';
import axios from "axios";




function Navbar() {

	const [allNotifications, setAllNotifications] = useState([]);
	const [imageUrl, setImageUrl] = useState([]);



	const [profileDropdown, setProfileDropdown] = useState(false);
	const [showNotification, setNotification] = useState(false),
		navRef = useRef(null);

	useEffect(() => {

		let userType = window.localStorage.getItem("userType");
		let userId = window.localStorage.getItem("userId");
		let fetchUrl = "";
		if (userType == 1)
			fetchUrl = "http://localhost:9000/student/profile/" + userId;

		else fetchUrl = "http://localhost:9000/debugger/profile/" + userId;

		axios.get(fetchUrl)
			.then((data) => {


				console.log(data.data);


				setAllNotifications(data.data.notifications);
				setImageUrl(data.data.imageUrl);

				console.log(allNotifications);
				console.log(imageUrl)

			})
			.catch((err) => {

				console.log(err);

			})

	}, [])

	useEffect(() => {
		const unsubscribe = window.addEventListener("scroll", handleScroll);
		return unsubscribe;
	}, [])

	const handleScroll = () => {
		if (window.scrollY > 0) navRef?.current?.classList?.add("navbar_shadow");
		else navRef?.current?.classList?.remove("navbar_shadow");
	}


	const onLogout = () => {

		window.localStorage.removeItem('userId')

		window.location.href = "http://localhost:3000"


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

					<div onClick={() => {
						showNotification ? setNotification(false) : setNotification(true);
					}} className="w-8 h-8 relative">
						<p className="grid place-items-center w-4 h-4 text-xs text-white font-semibold rounded-full bg-highlight absolute top-0 right-0 -translate-y-1/3">2</p>
						<BellIcon />
					</div>

					<div
						className="dropdown-content "
						style={{ display: showNotification ? "block" : "none" }}
					>



						<ul>
							{/* <DropdownContent closeDropdown={() => setNotification(false)} /> */}
							{allNotifications.map((notification,index) => {

								return <li><DropdownContent key={index} notification={notification} closeDropdown={() => setNotification(false)} /></li>

							})}

						</ul>
					</div>
				</div>

				<div className="dropdown">

					<div onClick={() => {
						profileDropdown ? setProfileDropdown(false) : setProfileDropdown(true);
					}} className=" navbar_profile">


						<img src={imageUrl} alt="profile" />

					</div>

					<div
						className="dropdown-content"
						style={{ display: profileDropdown ? "block" : "none" }}
					>
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
