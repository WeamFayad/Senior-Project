import React, { useEffect, useState } from "react";
import "./style.css";
import { userDataSource } from "../../../../../core/dataSource/remoteDataSource/users";

import { orderDataSource } from "../../../../../core/dataSource/remoteDataSource/orders";
import { useNavigate } from "react-router-dom";

function CheckoutDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getCartData = async () => {
    try {
      const response = await userDataSource.getCart();
      setCartItems(response.cartItems || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  useEffect(() => {
    setCartTotal(cartItems.reduce((total, item) => total + item.total, 0));
  }, [cartItems]);

  const handleQuantityChange = (itemIndex, newQuantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              quantity: newQuantity,
              total: item.productID.price * newQuantity,
            }
          : item
      )
    );
  };
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };
  //save to cart
  const savetoNewCart = async () => {
    try {
      const formattedCartItems = cartItems.map((item) => ({
        productID: item.productID._id,
        productImage: item.productImage,
        quantity: item.quantity,
        total: item.total,
      }));

      await userDataSource.updateCart({
        cartItems: formattedCartItems,
      });
      setMessage("cart saved");
    } catch (error) {}
  };
  //checkout
  const checkout = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product_id: item.productID._id,
        name: item.productID.name,
        image: item.productImage,
        quantity: item.quantity,
        total: item.total,
      }));

      await orderDataSource.placeOrder({
        items: orderItems,
        couponCode: coupon,
      });
      await userDataSource.updateCart({
        cartItems: [],
      });

      setMessage("checkout success");
      setTimeout(() => {
        setShowModal(false);
        navigate("/checkout-success");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="checkout-cart-all-content">
        {cartItems.length === 0 ? (
          <div className="center-div">
            <p className="checkout-cart-all-content-no-items">
              No items In Cart
            </p>
          </div>
        ) : (
          <>
            {cartItems.map((item, index) => {
              return (
                <div
                  key={item.productID.barcode}
                  className="checkout-cart-item"
                >
                  <div className="cart-items-section">
                    <img
                      src={`http://127.0.0.1:8000/images/products/${item.productImage}`}
                      alt={item.productID.name}
                    />
                    <div className="checkout-product-main-info">
                      <h4>{item.productID.name}</h4>
                      <p>${item.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="quantity">
                    <button
                      className="quantity-btn decrease"
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          Math.max(1, parseInt(e.target.value))
                        )
                      }
                      min="1"
                      max="10"
                    />
                    <button
                      className="quantity-btn increase"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="checkout-cart-total">
              <hr></hr>
              <div className="checkout-cart-total-value">
                <span>TOTAL:</span>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <hr></hr>
              <div className="checkout-actions">
                <div className="checkout-actions-coupon">
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    value={coupon}
                    on
                    onChange={(e) => {
                      handleCouponChange(e);
                    }}
                  />
                </div>
                <div className="checkout-action_btns">
                  <button
                    className="btn checkout-edit-btn"
                    onClick={() => {
                      savetoNewCart();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn checkout-btn"
                    onClick={() => {
                      handleCheckoutClick();
                    }}
                  >
                    Checkout
                  </button>
                </div>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <div>
                        <p>Are you sure you want to place order?</p>
                        <button
                          className="btn confirm-adoption-btn"
                          onClick={checkout}
                        >
                          Confirm
                        </button>
                        <p className="message">{message}</p>
                      </div>
                      <span className="close-btn" onClick={handleCloseModal}>
                        &times;
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="message">{message}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutDetails;
