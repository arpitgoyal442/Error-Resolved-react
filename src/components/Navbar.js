import React, { useState, useEffect, useRef } from "react";
import BellIcon from "@heroicons/react/solid/BellIcon";
import DropdownContent from "./student/DropdownContent";

function Navbar() {
	
	const [showNotification, setNotification] = useState(false),
	navRef = useRef(null);
	useEffect(() => {
    const unsubscribe = window.addEventListener("scroll", handleScroll);
    return unsubscribe;
  }, [])
	const handleScroll = () => {
    if(window.scrollY>0) navRef?.current?.classList?.add("navbar_shadow");
    else navRef?.current?.classList?.remove("navbar_shadow");
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
				<div
					
					className="dropdown"
				>
					<div  onClick={() => {
						showNotification ? setNotification(false) : setNotification(true);
					}} className="w-8 h-8 relative">
						<p className="grid place-items-center w-4 h-4 text-xs text-white font-semibold rounded-full bg-highlight absolute top-0 right-0 -translate-y-1/3">2</p>
						<BellIcon />
					</div>
					<div
						className="dropdown-content"
						style={{ display: showNotification ? "block" : "none" }}
					>
						<ul>
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
							<DropdownContent closeDropdown={() => setNotification(false)} />
						</ul>
					</div>
				</div>
				<div className="navbar_profile">
					<img src="/profile_img.jpeg" alt="profile" />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
