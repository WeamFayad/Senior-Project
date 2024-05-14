import React from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <h1>Home of</h1>
        <p>Vendors</p>
        <div className="header-ctas">
        
          <button
            className="btn header-cta-shop"
            onClick={() => navigate("/shop")}
          >
            Shop
          </button>
        </div>
      </div>
      <div className="header-table">
        
        <div className="header-table-item" onClick={() => navigate("/shop")}>
      
          <span>Shop your products</span>
        </div>
        
      </div>
    </div>
  );
}

export default Header;