import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


function Signin() {
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

		const userData={
			email:data.email,
			name:data.name,
			img:data.imageUrl,
			userType:2

		}

		// Make post request
		axios.post('http://localhost:9000/login', userData)
		.then(


			resdata=>{

				console.log(resdata.data);
				window.localStorage.setItem("userId",resdata.data);
				window.localStorage.setItem("userType",2);
				window.location.href="http://localhost:3000/debugger"
			
			}
			
			)
		.catch(err=>{console.log(err)})


		

		

	}

	const loginSuccessStudent=(data)=>{

		console.log(data);
		const userData={
			email:data.email,
			name:data.name,
			img:data.imageUrl,
			userType:1

		}

		// Make post request
		axios.post('http://localhost:9000/login', userData)
		.then(


			resdata=>{

				console.log(resdata.data);
				window.localStorage.setItem("userId",resdata.data);
				window.localStorage.setItem("userType",1);
				window.location.href="http://localhost:3000/student";
			
			
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
