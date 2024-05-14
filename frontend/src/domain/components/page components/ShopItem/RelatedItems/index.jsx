import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { selectProduct } from "../../../../../core/dataSource/localDataSource/product";
import { useNavigate } from "react-router-dom";

function RelatedItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProduct = useSelector((state) => {
    return state.Product.curerntSelected;
  });

  const relatedProducts = useSelector((state) =>
    state.Product.products
      .filter(
        (product) =>
          product.category === selectedProduct.category &&
          product.id !== selectedProduct._id
      )
      .sort((a, b) => b.price - a.price)
      .slice(0, 4)
  );

  const handleViewClick = (product) => {
    dispatch(selectProduct(product));
    window.scrollTo(0, 0);
  };

  return (
    <div className="related-items">
      <h2>Related Items</h2>
      <div className="related-items-grid">
        {relatedProducts.map((product, index) => (
          <div key={index} className="related-item-card">
            <div className="related-items-img">
              <img
                src={`http://localhost:8000/images/products/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="related-items-content">
              <p className="related-item-name">{product.name.toUpperCase()}</p>
              <p className="related-item-price">${product.price.toFixed(2)}</p>
              <button
                className="btn related-item-btn"
                onClick={() => handleViewClick(product)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedItems;
