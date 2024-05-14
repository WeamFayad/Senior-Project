import React from "react";
import Nav from "../../components/common/Nav";
import Footer from "../../components/common/Footer";
import HeaderImg from "../../components/common/HeaderImg";
import CheckoutDetails from "../../components/page components/Checkout/CheckoutDetails";

function Checkout() {
  return (
    <div>
      <Nav />
      <HeaderImg className="header-img" img_link="checkout-hero.png" />
      <CheckoutDetails />
      <Footer />
    </div>
  );
}
<style>


</style>
export default Checkout;
