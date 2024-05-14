import React from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import Success from "../../components/page components/CheckoutSuccess/Success";

function CheckoutSuccess() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="checkout-hero.png" />
      <Success />
      <Footer />
    </div>
  );
}

export default CheckoutSuccess;
