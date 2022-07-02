// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';

function Signin() {
	const img_style = {
		height: "505px",
		width: "600px",
		maxHeight: "100%",
		minHeight: "400px",
		backgroundColor: "lightgray",
	};
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
									<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue As Student</button>
								)}
								onSuccess={(res) => console.log(res)}
								onFailure={(err) => console.log(err)}
								cookiePolicy={'single_host_origin'}
							/>
							<GoogleLogin
								clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
								render={renderProps => (
									<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue As Developer</button>
								)}
								onSuccess={(res) => console.log(res)}
								onFailure={(err) => console.log(err)}
								cookiePolicy={'single_host_origin'}
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
