import React from "react";
import "./style.css";

function Category({ name, image, icon }) {
  return (
    <div className="container-card">
      <div className="category-card">
        <div className="category-card-front">
          <div className="category-icon">
            <img src={`./images/categories/icons/${icon}`} alt="" />
          </div>
          <div className="category-name">
            <h4>{name}</h4>
          </div>
        </div>
        <div className="category-card-back">
          <img src={`./images/categories/images/h3-category-${image}`} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Category;
