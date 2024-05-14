import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="success">
      <div className="success-img">
        <img src="./images/general/order-placed.png" alt="bone_picture" />
      </div>
      <p className="success-text">Order placed Successfully!</p>
      <button
        className="btn success-btn"
        onClick={() => {
          navigate("/shop");
        }}
      >
        Back To Shop
      </button>
    </div>
  );
}

export default Success;
