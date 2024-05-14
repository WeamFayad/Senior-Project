import React from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import ErrorMessage from "../../components/page components/Error/ErrorMessage";

function Error() {
  return (
    <div>
      <Nav />
      <HeaderImg img_link="error-hero.png" />
      <ErrorMessage />
      <Footer />
    </div>
  );
}

export default Error;
