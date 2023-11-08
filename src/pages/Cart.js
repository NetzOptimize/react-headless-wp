// ** Library Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

// ** Style Imports
import "../styles/pages/Cart.css";
import "../styles/components/Loader.css";

// ** Module Imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductCart, removeItem } from "../redux/slices/getCartSlice";
import { getLogo } from "../redux/slices/logoSlice";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ** Dispatch an action
  const dispatch = useAppDispatch();

  // ** Retrieve redux state's value
  const cartValues = useAppSelector((state) => state.getCart);
  const logo = useAppSelector((state) => state.media);

  // ** Set state's data
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(cartValues);
  }, [cartValues]);

  // ** Fetch cart data
  useEffect(() => {
    dispatch(getProductCart());
    dispatch(getLogo());
  }, [dispatch]);

  // ** Remove an item from cart
  const handleRemoveItem = (key) => {
    setLoading(true);
    dispatch(removeItem(key))
      .then(() => {
        dispatch(getProductCart());
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ** Loading until data fetched
  if (cartData.loading || logo.loading || loading) {
    return (
      <div className="loader_main_wrapper">
        <Circles color="#acff43" />
      </div>
    );
  }

  return (
    <div className="cart_main_wrapper">
      <div className="cart_sub_wrapper">
        <div>
          <div onClick={() => navigate("/")}>
            <img
              className="cart_logo"
              src={logo?.media?.source_url}
              alt="NetzOptimize"
            />
          </div>
          <h2 className="total_items">
            Your Cart ({cartData?.productCart?.items_count} items)
          </h2>
          <table className="table">
            <thead className="table_head">
              <tr className="table_row">
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.productCart?.items?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="item_thumbnail">
                      <img src={item?.images[0]?.src} alt="#" />
                      <span>{item.name}</span>
                    </td>
                    <td className="item_price">
                      <span>${item.prices.price}</span>
                    </td>
                    <td className="item_quantity_wrapper">
                      <div className="item_quantity">
                        <button>-</button>
                        <label>{item.quantity}</label>
                        <button>+</button>
                      </div>
                    </td>
                    <td className="item_total">
                      <span>${item.totals.line_total}</span>
                      <button
                        onClick={() => handleRemoveItem(item.key)}
                        className="remove_item_button"
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="checkout_main_wrapper">
        <div className="checkout_items">
          <h2>Order Summary</h2>
          <div className="underline"></div>
        </div>
        <table>
          <tbody className="checkout_table_body">
            <tr>
              <th>Subtotal</th>
              <td>
                <span>${cartData?.productCart?.totals?.total_items}</span>
              </td>
            </tr>
            <tr>
              <th>Coupon code</th>
              <td>
                <span>---</span>
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <span>${cartData?.productCart?.totals?.total_shipping}</span>
              </td>
            </tr>
            <tr>
              <th>Tax</th>
              <td>
                <span>${cartData?.productCart?.totals?.total_fees_tax}</span>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <span>${cartData?.productCart?.totals?.total_price}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="proceed_checkout">
          <span onClick={() => navigate("/checkout")}>Proceed to checkout</span>
        </div>

        <div className="continue_shopping">
          <span onClick={() => navigate("/")}>Continue Shopping</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
