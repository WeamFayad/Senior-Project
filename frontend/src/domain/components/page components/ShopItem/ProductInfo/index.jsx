import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../../../core/dataSource/localDataSource/product";
import { userDataSource } from "../../../../../core/dataSource/remoteDataSource/users";

function Productinfo() {
  const selectedProduct = useSelector((state) => {
    return state.Product.curerntSelected;
  });

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const addToCart = async () => {
    if (quantity > selectedProduct.stock) {
      setError(
        `you can order a max of ${selectedProduct.stock} of this product`
      );
      return;
    }
    try {
      await userDataSource.addToCart({
        productID: selectedProduct._id,
        quantity: parseInt(quantity),
        productImage: selectedProduct.image,
      });
      setMessage("Added to cart");
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [error, message]);

  return (
    <div className="product-info">
      {!Object.keys(selectedProduct)?.length === 0 ? (
        <div>No product selected</div>
      ) : (
        <div className="product-info-content">
          <div className="product-info_img">
            <img
              src={`http://localhost:8000/images/products/${selectedProduct?.image}`}
              alt={selectedProduct.name}
            />
          </div>
          <div className="product-info_text">
            <h4>| {selectedProduct?.category}</h4>
            <h3>{selectedProduct?.name}</h3>
            <p className="product-info_text-price">${selectedProduct?.price}</p>
            <p className="product-info_text-details">
              {selectedProduct?.description}
            </p>
            <div className="quantity">
              <button
                className="quantity-btn decrease"
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(Math.max(1, parseInt(e.target.value)))
                }
                min="1"
                max="10"
              />
              <button
                className="quantity-btn increase"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="btn" onClick={addToCart}>
              Add to Cart
            </button>
            <p className="error">{error}</p>
            <p className="message">{message}</p>
          </div>
        </div>
      )}

      <div className="product-details">
        <h4>Details</h4>
        <hr></hr>
        <p>{selectedProduct.details}</p>
      </div>
    </div>
  );
}

export default Productinfo;
