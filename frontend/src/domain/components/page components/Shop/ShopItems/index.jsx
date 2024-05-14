import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../../../core/dataSource/localDataSource/product";
import { useNavigate } from "react-router-dom";

function ShopItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewClick = (product) => {
    dispatch(selectProduct(product));
    navigate("/product-details");
  };

  const productData = useSelector((state) => state.Product);
  const [price, setPrice] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [filter, setFilter] = useState({ category: "all", price: "" });
  const [filteredProducts, setFilteredProducts] = useState(
    productData.products
  );

  useEffect(() => {
    let newFilteredProducts = productData.products;

    if (filter.category !== "all") {
      newFilteredProducts = newFilteredProducts?.filter(
        (product) => product.category === filter.category
      );
    }

    if (filter.price) {
      newFilteredProducts = newFilteredProducts?.filter(
        (product) => product.price <= filter.price
      );
    }

    setFilteredProducts(newFilteredProducts);
  }, [filter, productData.products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    setFilter({ ...filter, price: newPrice });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {}, [currentProducts]);
  return (
    <div className="products-show-container">
      <div className="filters">
        <div className="filter-category">
        <h3>Category</h3>
<hr></hr>
<label>
  <input
    type="radio"
    name="category"
    value="all"
    checked={filter.category === "all"}
    onChange={handleCategoryChange}
  />
  All
</label>
<label>
  <input
    type="radio"
    name="category"
    value="FARM-FRESH PRODUCE"
    checked={filter.category === "FARM-FRESH PRODUCE"}
    onChange={handleCategoryChange}
  />
  Farm-Fresh Produce
</label>
<label>
  <input
    type="radio"
    name="category"
    value="ARTISANAL FOODS"
    checked={filter.category === "ARTISANAL FOODS"}
    onChange={handleCategoryChange}
  />
  Artisanal Foods
</label>
<label>
  <input
    type="radio"
    name="category"
    value="SPECIALTY BEVERAGES"
    checked={filter.category === "SPECIALTY BEVERAGES"}
    onChange={handleCategoryChange}
  />
  Specialty Beverages
</label>
<label>
  <input
    type="radio"
    name="category"
    value="HANDMADE CRAFTS"
    checked={filter.category === "HANDMADE CRAFTS"}
    onChange={handleCategoryChange}
  />
  Handmade Crafts
</label>
<label>
  <input
    type="radio"
    name="category"
    value="ECO-FRIENDLY PRODUCTS"
    checked={filter.category === "ECO-FRIENDLY PRODUCTS"}
    onChange={handleCategoryChange}
  />
  Eco-Friendly Products
</label>
<label>
  <input
    type="radio"
    name="category"
    value="HEALTH & WELLNESS"
    checked={filter.category === "HEALTH & WELLNESS"}
    onChange={handleCategoryChange}
  />
  Health & Wellness
</label>


        </div>
        <div className="filter-category second-filter">
          <h3>Price</h3>
          <hr></hr>
          <input
            type="range"
            id="priceSlider"
            name="priceSlider"
            min={1}
            max={100}
            value={price}
            onChange={handlePriceChange}
          />
          <p>Price to be less than ${price}</p>
        </div>
      </div>
      <div className="product-pagination-main">
        {currentProducts?.length === 0 ? (
          <div className="no-products-to-show">
            <p>No Products Found</p>
          </div>
        ) : (
          <>
            <div className="product-pagination-header">
              <p>SHOP</p>
            </div>
            <div className="product-pagination-controls">
              <button
                className="btn btn-pagination-left"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                className="btn btn-pagination-right"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(productData?.products?.length / productsPerPage)
                }
              >
                &gt;
              </button>
            </div>

            <div className="product-pagination-productCards">
              {currentProducts?.map((product, index) => (
                <div key={index} className="product-pagination-card">
                  <div className="product-img-container">
                    <img
                      src={`http://localhost:8000/images/products/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>
                      {product.details} | {product.price}
                    </p>
                    <button
                      className="btn btn-adopt"
                      onClick={() => handleViewClick(product)}
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="product-pagination-controls">
              <button
                className="btn btn-pagination-left"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                className="btn btn-pagination-right"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(productData?.products?.length / productsPerPage)
                }
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShopItems;
