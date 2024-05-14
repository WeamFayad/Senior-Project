import React from "react";
import Footer from "../../components/common/Footer";
import Nav from "../../components/common/Nav";
import ShopCategories from "../../components/page components/Home/ShopCategories";
import ImageGrid from "../../components/page components/Home/ImageGrid";

import Header from "../../components/page components/Home/Header";

function Home() {
  return (
    <div>
      <Nav />
      <Header />
      <ShopCategories />
      <ImageGrid />
     
      <Footer />
    </div>
  );
}

export default Home;
