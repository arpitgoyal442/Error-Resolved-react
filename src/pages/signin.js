import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

import {URL} from "../Globals/Constants.js"


function Signin() {

	const navigate=useNavigate();

	const img_style = {
		height: "505px",
		width: "600px",
		maxHeight: "100%",
		minHeight: "400px",
		backgroundColor: "lightgray",
	};


	const loginSuccessDebugger=(data)=>{

		// make request to backend to send userId

		console.log(data);

		let userdata=data.profileObj;

		const userData={
			email:userdata.email,
			name:userdata.name,
			img:userdata.imageUrl,
			userType:2

		}

		console.log(userData);

		// Make post request
		axios.post(`${URL}/login`, userData)
		.then(


			resdata=>{

				console.log(resdata.data);
				
				window.localStorage.setItem("userId",resdata.data._id);
				window.localStorage.setItem("userType",2);
				window.localStorage.setItem("userName",resdata.data.name);
				
				navigate("/debugger");

				console.log("User data: ");
				console.log(resdata);
			
			}
			
			)
		.catch(err=>{console.log(err)})


		

		

	}

	const loginSuccessStudent=(data)=>{


		let userdata=data.profileObj;

		const userData={
			email:userdata.email,
			name:userdata.name,
			img:userdata.imageUrl,
			userType:1

		}


		

		// Make post request
		axios.post(`${URL}/login`, userData)
		.then(



			resdata=>{

				

				console.log(resdata.data);
				window.localStorage.setItem("userId",resdata.data._id);
				window.localStorage.setItem("userType",1);
				window.localStorage.setItem("userName",resdata.data.name);
				
				navigate('/student');
			
			
			
			}
			
			)
		.catch(err=>{console.log(err)})


	}

	return (
		<div className="signin">
			<div className="signinCard">
				<div className="signin_left">
					<img className="signin_img" src="/signin_img.jpeg.svg" alt="" style={img_style} />
				</div>
				<div className="signin_right">
					<div className="signin_right_card">
						<h1>
							<del>Error</del>: Resolved 
							
						</h1>
						<div className="signin_right_card_buttons">
							<GoogleLogin
							            
								clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
								render={renderProps => (
									<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue As Student </button>
								)}
								onSuccess={loginSuccessStudent}
								onFailure={(err) => console.log(err)}
								cookiePolicy={'single_host_origin'}
								isSignedIn={true}
							/>
							<GoogleLogin
								clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
								render={renderProps => (
									<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue As Developer</button>
								)}
								onSuccess= {loginSuccessDebugger}
								onFailure={(err) => console.log(err)}
								cookiePolicy={'single_host_origin'}
								isSignedIn={true}
							/>
						</div>
						<p>we can&apos;t help everyone, but everyone can help someone!</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin;
