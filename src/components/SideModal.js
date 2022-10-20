import React from 'react'
import { useEffect } from 'react'

function SideModal() {



   const hideModal=()=>{


    document.getElementsByClassName("sideModal")[0].classList.remove("showModal");
    document.getElementsByClassName("sideModal")[0].classList.add("hideModal");

    console.log(console.log(document.getElementsByClassName("sideModal")[0].classList))
   }
   





    return (
        <div className='sideModal' onClick={hideModal}>


            <div className="sideModal_left">

                <h1 className='sideModal_left_topic'>Java Doubt</h1>

                <span>
                    <p className='subhead'>Budget: ₹45/-</p>
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
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution</p>


                    <p className='subhead'>Long Description</p>
                    <p>here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

                </span>

            </div>


            <div className="sideModal_right">

            </div>





        </div>
    )
}

export default SideModal
