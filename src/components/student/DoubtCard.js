import { Link } from "react-router-dom";
import axios from "axios";

import MaterialIcon from "material-icons-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { socket } from "../../socket";

import { URL } from "../../Globals/Constants.js";
import { front_URL } from "../../Globals/Constants";

function StudentDoubtCard({ doubtInfo }) {
  const onDeleteClick = () => {
    axios
      .delete(`${URL}/doubt/${doubtInfo._id}`)
      .then(() => {
        socket.emit("delete-doubt", doubtInfo);

        toast("Deleted Successfully", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // onClose:()=>{navigate("/student")},
          theme: "dark",
        });
      })
      .catch(() => {
        toast.warn("Deletion Failed", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

          theme: "dark",
        });
      });
  };

  return (
    <div className="studentDoubtCard">
      <p className="studentDoubtCard_date">{doubtInfo.postedTime}</p>
      <h4 className="studentDoubtCard_topic">{doubtInfo.topic}</h4>
      <ToastContainer />
      <ul className="studentDoubtCard_dropdown">
        {doubtInfo.debuggerId != null && (
          <Link
            to={`/solve-doubt/${doubtInfo._id}`}
            state={{ aboutDoubt: doubtInfo }}
          >
            <div>
              <span>
                <MaterialIcon icon="meeting_room" size={25} color="gray" />
              </span>
            </div>
          </Link>
        )}

        <Link to="/student/edit-doubt" state={{ aboutDoubt: doubtInfo }}>
          <div>
            <span className="iconify-inline" data-icon="ci:edit"></span>
          </div>
        </Link>
        <div onClick={onDeleteClick}>
          <span
            className="iconify-inline"
            data-icon="fluent:delete-24-filled"
          ></span>
        </div>
      </ul>
      <p className="studentDoubtCard_text">{doubtInfo.shortDescription}</p>
    </div>
  );
}

export default StudentDoubtCard;
