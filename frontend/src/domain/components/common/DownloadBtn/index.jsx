import React from "react";
import "./style.css";
function Downloadbtn({ text, image }) {
  
  return (
    <div className="downloadBtn">
      <img src={`/images/productIcons/${image}`} alt="product icon" />
      <div className="downloadBtn-text">
        <p className="downloadBtn-p1">Get it on</p>
        <p className="downloadBtn-p2">{text}</p>
      </div>
    </div>
  );
}

export default Downloadbtn;
//use <Downloadbtn text="" image="example.png"/>>
