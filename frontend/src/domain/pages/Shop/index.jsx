import React, { useEffect } from "react";
import Nav from "../../components/common/Nav";
import HeaderImg from "../../components/common/HeaderImg";
import Footer from "../../components/common/Footer";
import ShopItems from "../../components/page components/Shop/ShopItems";
import { useDispatch } from "react-redux";
import { productDataSource } from "../../../core/dataSource/remoteDataSource/products";
import { loadProducts } from "../../../core/dataSource/localDataSource/product";

function Shop() {
  const dispatch = useDispatch();

  const loadproducts = async () => {
    try {
      const response = await productDataSource.getProducts();

      dispatch(loadProducts(response.products));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadproducts();
  }, []);

  return (
    <div>
      <Nav />
      <HeaderImg img_link="shop-hero.png" />
      <ShopItems />

      <Footer />
    </div>
  );
}

export default Shop;
