import React, { useEffect, useState } from "react";
import "./styles.css";

import { userDataSource } from "../../../../../core/dataSource/remoteDataSource/users";
import { useNavigate } from "react-router-dom";

const CartButton = ({ isCartMenuHidden, setIsCartMenuHidden }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  let cartTotal = 0;

  const getCartData = async () => {
    try {
      const response = await userDataSource.getCart();
      setCartItems(response.cartItems || []);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getCartData();
  }, [isCartMenuHidden]);

  return (
    <div
      className={
        isCartMenuHidden ? "cart-drop-down" : "cart-drop-down cart-show"
      }
    >
      <div className="cart-all-content">
        {cartItems?.length === 0 ? (
          <div className="center-div">
            <p className="cart-all-content-no-items">No items In Cart</p>
          </div>
        ) : (
          <>
            {cartItems?.map((item) => {
              cartTotal += item.total;
              return (
                <>
                  <div key={item.productID.barcode} className="cart-item">
                    <div className="cart-items-section">
                      <img
                        src={`http://127.0.0.1:8000/images/products/${item.productImage}`}
                        alt={item.productID.name}
                      />
                      <div className="product-main-info">
                        <h4>{item.productID.name}</h4>
                        <p>${item.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="cart-items-quantity">{item.quantity}</p>
                  </div>
                </>
              );
            })}
            <div className="cart-total">
              <hr></hr>
              <div className="cart-total-value">
                <span>TOTAL:</span>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <button
                className="view-cart-button"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                view cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartButton;
