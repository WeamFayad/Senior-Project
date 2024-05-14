import React from "react";
import "./style.css";
function HeaderImg({ img_link }) {
  return (
    <div className="section-header-img-1">
      <img src={`./images/hero/${img_link}`} alt="hero_image" />
    </div>
  );
}

export default HeaderImg;
