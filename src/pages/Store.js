// ** Library Imports
import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";

// ** Assets Imports
import cartIcon from "../assets/images/cart-icons.png";
import PilePadWallpaper from "../assets/images/PilePad-Made-in-the-USA.png";

// ** Style Imports
import "../styles/pages/Store.css";

// ** Module Imports
import { getStoreData } from "../redux/slices/storeDataSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductCategory } from "../redux/slices/categorySlice";
import { addItem } from "../redux/slices/cartSlice";
import { getProductCart } from "../redux/slices/getCartSlice";

const Store = () => {
  // ** Dispatch an action
  const dispatch = useAppDispatch();

  // ** Retrieve redux state's value
  const productData = useAppSelector((state) => state.store);
  const productCategories = useAppSelector((state) => state.category);
  const cart = useAppSelector((state) => state.cart);

  // ** Set state's data
  const [products, setProducts] = useState(productData.storeData);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(productCategories);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setProducts(productData.storeData);
    setCategories(productCategories);
  }, [productData, productCategories]);

  // ** Sort data for the categories
  function sortData(data) {
    const sortedData = {};
    data.forEach((item) => {
      if (!sortedData[item.parent]) {
        sortedData[item.parent] = [];
      }
      sortedData[item.parent].push(item);
    });

    return sortedData;
  }
  const sortedData = sortData(categories.productCategory);

  // ** Fetch store's data
  React.useEffect(() => {
    dispatch(getStoreData());
    dispatch(getProductCategory());
  }, [dispatch]);

  // ** Filter data on category click
  const handleFilter = (data) => {
    setSelectedCategory(data);
    const filter = products
      ? products
          .map((product) => {
            const filteredCategories = product.categories.filter(
              (category) => category.slug === data
            );

            if (filteredCategories.length > 0) {
              return { ...product, categories: filteredCategories };
            }
          })
          .filter(Boolean) // ** Remove undefined values
      : [];

    setFilteredProducts(filter);
  };

  // ** Add item in the cart
  const handleAddToCart = (id) => {
    dispatch(addItem(id))
      .then(() => {
        dispatch(getProductCart());
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <div className="store_main_container">
      <div className="store_head_container">
        <div>
          <img className="wallpaper" src={PilePadWallpaper} alt="#" />
        </div>
        <div className="head_right_container">
          <h2 className="heading_title">Shop</h2>
          <div className="heading_widget_container">
            De-stress docking. Once and for all.
          </div>
        </div>
      </div>
      <div className="products_wrapper">
        <div className="left_wrapper">
          <div className="products_categories">
            <h2 style={{ fontFamily: "Oswald" }}>Product Categories</h2>

            {/* Products */}
            <h3
              style={{
                cursor: "pointer",
                color:
                  selectedCategory === sortedData[0]?.[3].slug
                    ? "#acff43"
                    : "black",
                fontFamily: "Oswald",
              }}
              onClick={() => handleFilter(sortedData[0]?.[3].slug)}
            >
              {sortedData[0]?.[3].name}
            </h3>
            {sortedData[126]?.map((el, index) => {
              return (
                <ul
                  key={index}
                  style={{
                    cursor: "pointer",
                    color: selectedCategory === el.slug ? "#acff43" : "black",
                    fontFamily: "Oswald",
                  }}
                >
                  <li onClick={() => handleFilter(el.slug)}>{el.name}</li>
                </ul>
              );
            })}
            {/* Mini Products */}
            <h3
              style={{
                cursor: "pointer",
                color:
                  selectedCategory === sortedData[0]?.[1].slug
                    ? "#acff43"
                    : "black",
                fontFamily: "Oswald",
              }}
              onClick={() => handleFilter(sortedData[0]?.[1].slug)}
            >
              {sortedData[0]?.[1].name}
            </h3>

            {/* Packages */}
            <h3
              style={{
                cursor: "pointer",
                color:
                  selectedCategory === sortedData[0]?.[2].slug
                    ? "#acff43"
                    : "black",
                fontFamily: "Oswald",
              }}
              onClick={() => handleFilter(sortedData[0]?.[2].slug)}
            >
              {sortedData[0]?.[2].name}
            </h3>
            {sortedData[154]?.map((el, index) => {
              return (
                <ul
                  key={index}
                  style={{
                    cursor: "pointer",
                    color: selectedCategory === el.slug ? "#acff43" : "black",
                    fontFamily: "Oswald",
                  }}
                >
                  <li onClick={() => handleFilter(el.slug)}>{el.name}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="right_wrapper">
          {productData.loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Circles color="#acff43" />
            </div>
          ) : (
            <div className="right_sub_wrapper">
              {filteredProducts.length > 0
                ? filteredProducts.map((el, key) => {
                    return (
                      <li className="product" key={key}>
                        <img
                          style={{ width: "300px", height: "300px" }}
                          src={el?.images[0]?.src}
                          alt="#"
                        />
                        <h2 className="product_name">{el.name}</h2>
                        <span className="product_price">
                          ${el.regular_price}
                        </span>
                        <button
                          className="add_to_cart"
                          onClick={() => handleAddToCart(el.id)}
                          disabled={cart?.loading}
                        >
                          <img className="cart_icon" src={cartIcon} alt="#" />
                          ADD TO CART
                        </button>
                      </li>
                    );
                  })
                : products.map((el, key) => {
                    return (
                      <li className="product" key={key}>
                        <img
                          style={{ width: "300px", height: "300px" }}
                          src={el?.images[0]?.src}
                          alt="#"
                        />
                        <h2 className="product_name">{el.name}</h2>
                        <span className="product_price">
                          ${el.regular_price}
                        </span>
                        <button
                          className="add_to_cart"
                          disabled={cart?.loading}
                          onClick={() => handleAddToCart(el.id)}
                        >
                          <img className="cart_icon" src={cartIcon} alt="#" />
                          ADD TO CART
                        </button>
                      </li>
                    );
                  })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
