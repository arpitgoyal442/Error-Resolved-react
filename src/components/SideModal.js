import React from 'react'
import { useEffect,useState } from 'react'
import { Icon } from '@iconify/react';
import {URL} from "../Globals/Constants.js"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { socket } from '../socket.js';




function SideModal({ doubt,index}) {

    const [isRequested,setIsRequested]=useState(false)

    useEffect(()=>{


        if(doubt.incomingRequests.includes(window.localStorage.getItem("userId")))
        setIsRequested(true);


        


    },[])

    const hideModal = (e) => {
        
        document.getElementById(doubt._id).classList.remove("showModal");
        document.getElementById(doubt._id).classList.add("hideModal");

       
    }

    const makeRequest=()=>{

        if(isRequested)
		{
			toast.info('Already Requested Kindly wait for response', {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			
				theme:'dark'
				});
		}

		else {
			let debuggerId=window.localStorage.getItem("userId");
			let doubtId=doubt._id;
			let studentId=doubt.studentId;

            console.log("On making request");
            console.log(debuggerId+"---"+doubtId+"--"+studentId);
			
			
			axios.post(`${URL}/debugger/request/${debuggerId}`,{doubtId:doubtId,studentId:studentId})
			.then((data)=>{

                setIsRequested(true)

				toast('Requested Successfully ', {
					position: "bottom-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				
					theme:'dark'
					});


					socket.emit("request-doubt",data.data)
				 
				console.log("Successfull request");
				console.log(data);
			})
			.catch((err)=>{

				console.log("Error in request");
				console.log(err); 

			})
			
		}
    }






    return (
        <div className='sideModal' id={doubt._id} >
            <ToastContainer/>

            <span onClick={hideModal} className='close_modal'>
                <Icon icon="ant-design:left-outlined" color="grey" width="25" height="25" inline={true} />
            </span>


            <div className="sideModal_left">

                <h1 className='sideModal_left_topic'>{doubt.topic}</h1>




                <span>

                    <p className='subhead'>Budget: ₹{doubt.price}/-</p>
                    <p className='subhead'>Required Skills :</p>

                    <span className='skills'>
                        <p>Java</p>
                        <p>C++</p>
                        <p>Data Structures</p>
                        <p>Graphs</p>

                        <p>Data Structures</p>
                        <p>Java</p>
                        <p>C++</p>
                        <p>Data Structures</p>
                    </span>
                </span>


                <span className='descriptions'>

                    <p className='subhead'>Short Description</p>
                    <p>{doubt.shortDescription}</p>
                    {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution</p> */}


                    <p className='subhead'>Long Description</p>
                    <p>{doubt.longDescription}</p>
                    {/* <p>here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p> */}

                </span>

            </div>


            <div className="sideModal_right">

                {/* <span className='close_modal'>
                <Icon icon="entypo:circle-with-cross" color="#008891" width="30" height="30" inline={true} />
                </span> */}

                <h1 className='sideModal_right_topic'>About the Client</h1>


                <span className='user_icon'>
                    <Icon icon="carbon:user-avatar-filled" color="grey" width="50" height="50" inline={true} /></span>

                <p className='client_name'>{doubt.studentName}</p>

                <div>

                    <span>
                        <Icon icon="carbon:star-filled" color="#008891" width="20" height="20" inline={true} /></span>
                    <span> <Icon icon="carbon:star-filled" color="#008891" width="20" height="20" inline={true} /></span>
                    <span> <Icon icon="carbon:star-filled" color="#008891" width="20" height="20" inline={true} /></span>
                    <span> <Icon icon="carbon:star-filled" color="#008891" width="20" height="20" inline={true} /></span>
                    <Icon icon="carbon:star-half" color="#008891" width="20" height="20" inline={true} />
                </div>

                <span className='client_location'>
                    <Icon icon="entypo:location-pin" color="grey" width="30" height="30" inline={true} />
                    <p>Haryana</p>
                </span>


                <p onClick={makeRequest} className='request_btn'>{isRequested?"Already Requested":"Make Request"}</p>
                <p className='message_btn'> Send Message</p>


                <span>

                </span>

            </div>





        </div>
    )
}

export default SideModal
