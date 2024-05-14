import React from "react";
import "./style.css";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

function ShopCategories() {
  const navigate = useNavigate();

  return (
    <div className="shop-by">
      <div className="grid-header">
        <img src="./favicon.png" alt="logo"></img>
        <h3>Shop By Category</h3>
      </div>
      <div
        className="shop-catogories"
        onClick={() => {
          navigate("/shop");
        }}
      >
       <Category name="Farm-Fresh Produce" image="1.png" />
<Category name="Artisanal Foods" image="2.png"  />
<Category name="Specialty Beverages" image="4.png"  />
<Category name="Handmade Crafts" image="3.png" />
<Category name="Eco-Friendly Products" image="5.png"  />
<Category name="Health & Wellness" image="6.png" />


      </div>
    </div>
  );
}

export default ShopCategories;
