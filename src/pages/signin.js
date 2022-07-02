

// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';








function Signin() {




	const img_style = {

		height: "505px",
		width: "600px",
		maxHeight: "100%",
		minHeight: "400px",

		backgroundColor: "lightgray"
	}

	const login = useGoogleLogin(
		{
		
		onSuccess: (tokenResponse) =>{ console.log(tokenResponse) ;
			//  window.location.href="http://localhost:3000/debugger" 
			},
	  }
	  
	  );





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

						<button onClick={() => login()}>
						    Continue As Student
						</button>

						<button onClick={() => login()}>
						    Continue As Debugger
						</button>

						</div>


						<p>we can&apos;t help everyone, but everyone can help someone!</p>
					</div>
				</div>

			</div>
		</div>

	);
}

export default Signin;
