import React from 'react'
import OurAdvantage from '../components/OurAdvantage'

import "react-image-gallery/styles/css/image-gallery.css";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useNavigate } from "react-router-dom"



import { URL } from "../Globals/Constants.js"

function Login2() {

    const navigate = useNavigate();


    

    const loginSuccessDebugger = (data) => {

		// make request to backend to send userId

		console.log(data);

		let userdata = data.profileObj;

		const userData = {
			email: userdata.email,
			name: userdata.name,
			img: userdata.imageUrl,
			userType: 2

		}

		console.log(userData);

		// Make post request
		axios.post(`${URL}/login`, userData)
			.then(


				resdata => {

					console.log(resdata.data);

					window.localStorage.setItem("userId", resdata.data._id);
					window.localStorage.setItem("userType", 2);
					window.localStorage.setItem("userName", resdata.data.name);

					navigate("/debugger");

					console.log("User data: ");
					console.log(resdata);

				}

			)
			.catch(err => { console.log(err) })

	}

	const loginSuccessStudent = (data) => {


		let userdata = data.profileObj;

		const userData = {
			email: userdata.email,
			name: userdata.name,
			img: userdata.imageUrl,
			userType: 1

		}




		// Make post request
		axios.post(`${URL}/login`, userData)
			.then(
				resdata => {
					console.log(resdata.data);
					window.localStorage.setItem("userId", resdata.data._id);
					window.localStorage.setItem("userType", 1);
					window.localStorage.setItem("userName", resdata.data.name);

					navigate('/student');
				}
			)
			.catch(err => { console.log(err) })
	}


    return (

        <div className='login'>

            <div className="login_navbar">

                <h2>
                    <del>Error</del>: Resolved

                </h2>

                <span>

                    <GoogleLogin

                        clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
                        render={renderProps => (
                            <p className='login_button' onClick={renderProps.onClick} disabled={renderProps.disabled}> Log In </p>
                        )}
                        onSuccess={loginSuccessDebugger}
                        onFailure={(err) => console.log(err)}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </span>

            </div>


            <div className="login_body">

                <div className="login_body_services">
                    <div className="services_left">
                        <h1 className='main_headings'>Connecting Who  Knows <br />  And Knowing </h1>
                        <p>Someone is out there who wants to  help you and whom you can help.</p>

                        <span className="services_buttons">
                            <GoogleLogin

                                clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
                                render={renderProps => (
                                    <p onClick={renderProps.onClick} className='solve_button'>Solve Queries</p>
                                )}
                                onSuccess={loginSuccessDebugger}
                                onFailure={(err) => console.log(err)}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />

                            <GoogleLogin

                                clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com"
                                render={renderProps => (
                                    <p  onClick={renderProps.onClick} disabled={renderProps.disabled}> Add Doubts </p>
                                )}
                                onSuccess={loginSuccessStudent}
                                onFailure={(err) => console.log(err)}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                           
                        </span>


                    </div>
                    <div className="services_right">
                        <p className='oherror manthoughts thoughts'>Oh Error!</p>
                        <p className='mockInterview manthoughts  thoughts'>Mock Interview</p>
                        <p className='learnTopic manthoughts  thoughts'>Learn Topic</p>
                        <p className='gotYou manthoughts  thoughts'> I Got YOu</p>
                        <img src="/landing4.svg" alt="" />
                    </div>
                </div>

                <div className="login_body_Providing">
                    <div className="providing_left">

                        <img src="/bugeat3.svg" alt="" />


                    </div>
                    <div className="providing_right">
                        <h1 className='main_headings'>Don't Let Your Bugs Eat up the Whole Day</h1>

                        <div>
                           
                            <ul>
                                <li>Add Your Doubt </li>
                                <li>Get Responses From Experts </li>
                                <li>Accept Request Accordingly</li>
                                <li>Pay if you feel satisfied with Solution</li>
                            </ul>
                        </div>


                    </div>




                </div>


                <div className="login_body_whyWe">


                    <h1 className='main_headings'>Why Clients Visit us</h1><br />

                    <div className="login_body_whyWe_cards">

                        <OurAdvantage title="Earn And Learn" icon="dashicons:welcome-learn-more" para="Help others with what you Know and Earn ." />
                        <OurAdvantage title="Quick Payment" icon="mdi:cash-fast" para="Payments are really Quick and without hustle." />
                        <OurAdvantage title="Pay if Satisfied" icon="bxs:happy-alt" para="Only Pay if you have understood and satisfied with solution" />
                        <OurAdvantage title="Low Platform Fee" icon="mdi:cash-remove" para="Platform fee is as low as 5% only ." />

                    </div>

                </div>
















            </div>


        </div>
    )
}

export default Login2;


