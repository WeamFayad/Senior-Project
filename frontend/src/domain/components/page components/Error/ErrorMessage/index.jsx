import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function ErrorMessage() {
  const navigate = useNavigate();
  
  return (
    <div className="errormessage">
      <div className="errormessage-img">
        <img src="./images/general/error-img.png" alt="bone_picture" />
      </div>
      <h4>Something Went Wrong</h4>
      <p className="errormessage-text">Could not process your request...</p>
      <button
        className="btn errormessage-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </button>
    </div>
  );
}

export default ErrorMessage;
