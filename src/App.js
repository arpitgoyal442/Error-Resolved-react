import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./views/signin.js"
import DebuggerHome from "./views/debugger/index.js"
import StudentHome from "./views/student/index.js"

import OpenDoubt from "./views/debugger/doubt/OpenDoubt.js"


//


import "./styles/Login.css"
import './styles/Navbar.css'
import "./styles/variables.css"
import "./styles/DoubtContainer.css"
import "./styles/index.css"
import "./styles/RightChatBar.css"
import "./styles/DoubtPage.css"
import "./styles/Modal.css"
import "./styles/debugger/DoubtCard.css"
import "./styles/debugger/Leftbar.css"
import "./styles/debugger/DebuggerHome.css"
import "./styles/debugger/DebuggerFilters.css"
import "./styles/student/StudentHome.css"
import "./styles/student/StudentLeftbar.css"
import "./styles/student/StudentDoubtCard.css"
import "./styles/student/Filters.css"
import "./styles/student/NewDoubt.css"
import "./styles/debugger/DebuggerProfile.css"
import "./styles/UserChart.css"
import "./styles/debugger/DoubtModal.css"
import "./styles/student/NotificationHandle.css"
import "./styles/student/EditDoubt.css"




//


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"  element={< Signin />}></Route>
        <Route exact path="/debugger"  element={< DebuggerHome />}></Route>
        <Route exact path="/student"  element={< StudentHome />}></Route>
        <Route  path="/debugger/doubt/:id"  element={< OpenDoubt />}></Route> 
       
        
         
       
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
