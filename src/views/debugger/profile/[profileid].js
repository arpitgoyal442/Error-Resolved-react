
import Navbar from "../../../components/Navbar.js";
import UserChart from "../../../components/student/UserChart.js";
function debuggerprofile(){

    return(

        <div className="debuggerProfile">
            
            <Navbar/>
            <div className="debuggerProfile_body">



                <div className="debuggerProfile_card">
                <div className="debuggerProfile_body_left">

                     
                    <img src="/profile_img.jpeg" alt="" />
                    
                    
                    <h2>Arpit Goyal ⭐⭐⭐⭐</h2>
                    
                
                    
                    
                    <p>arpitgoyal@gmail.com</p>
                    
                    <p> 9998585885</p>
                    <p>Doubts Resolved: 54</p>
                    <p>Total Earning: 2500/-</p>
                    

                </div>

                <div className="debuggerProfile_body_right">

                    <UserChart/>
                    
                </div>
                
               
                
                </div>
                


            </div>

        </div>

    );



}

export default debuggerprofile;