function signin() {


	const img_style={

		height:"505px",
		width:"600px",
		maxHeight:"100%",
		minHeight:"400px",
	
		backgroundColor:"lightgray"
	}

	return (
		<div className="signin">
			{/* <img src="/sign_back.svg" alt="" /> */}

			<div className="signinCard">

			

			<div className="signin_left">
				<img className="signin_img" src="/signin_img.jpeg.svg" alt="" style={img_style} />
			</div>

			<div className="signin_right">
				<div className="signin_right_card">
					<h1>
						<del>Error</del>: Resolved
					</h1>
					<button>Continue As Student</button>
					<button>Continue As Debugger</button>
					<p>we can&apos;t help everyone, but everyone can help someone!</p>
				</div>
			</div>

			</div>
		</div>
	);
}

export default signin;
