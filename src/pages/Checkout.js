// ** Library Imports
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

// ** Assets Imports
import logo from "../assets/images/logo.png";

// ** Style Imports
import "../styles/pages/Checkout.css";

// ** Module Imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductCart } from "../redux/slices/getCartSlice";
import { checkout } from "../redux/slices/checkoutSlice";

const Checkout = () => {
  // ** Dispatch an action
  const dispatch = useAppDispatch();

  // ** Retrieve redux state's value
  const cartValues = useAppSelector((state) => state.getCart);

  // ** Set state's data
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(cartValues);
  }, [cartValues]);

  // ** Fetch cart data
  useEffect(() => {
    dispatch(getProductCart());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const country = "US";
  const onSubmit = async (value) => {
    const billing_address = {
      first_name: value.firstName,
      last_name: value.lastName,
      company: value.company,
      address_1: value.address1,
      address_2: value.address2,
      city: value.city,
      state: value.state,
      postcode: value.postcode,
      country: country,
      email: value.email,
      phone: value.phone,
    };
    const finalData = {
      billing_address,
      payment_method: "cod",
    };
    dispatch(checkout(finalData));
  };

  return (
    <div className="checkout_wrapper">
      <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
        <div className="checkout_sub_wrapper">
          <div>
            <img className="checkout_logo" src={logo} alt="#" />
            <div className="checkout_form">
              <h3>Billing Details</h3>
              <div className="checkout_underline" />

              <div className="form">
                <div className="full_name">
                  <div className="first_name">
                    <label className="label">First Name</label>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="First Name"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.firstName && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="last_name">
                    <label className="label">Last Name</label>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="Last Name"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="company">
                  <label className="label">Company name (Optional)</label>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Company name"
                        {...field}
                        className="input"
                      />
                    )}
                  />
                </div>
                <div className="address">
                  <label className="label">Address</label>
                  <Controller
                    name="address1"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Address"
                        {...field}
                        className="input"
                      />
                    )}
                  />
                </div>

                <div className="address">
                  <label className="label">Address two</label>
                  <Controller
                    name="address2"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Address two"
                        {...field}
                        className="input"
                      />
                    )}
                  />
                </div>
                <div className="address_details">
                  <div>
                    <label className="label">City</label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="City"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.city && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">State/Country</label>
                    <Controller
                      name="state"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="State/Country"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.state && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">Postcode/Zip</label>
                    <Controller
                      name="postcode"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="Postcode/Zip"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.postcode && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="full_name">
                  <div className="first_name">
                    <label className="label">Phone</label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="Phone"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.phone && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="last_name">
                    <label className="label">Email address</label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          placeholder="Email"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="validation_error">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout_summary_wrapper">
          <div className="checkout_summary_items">
            <h2>Order Summary</h2>
            <div className="checkout_underline" />
          </div>
          <table>
            <tbody className="checkout_summary_table_body">
              <tr>
                {cartData.productCart?.items?.map((value, key) => {
                  return (
                    <td className="products" key={key}>
                      <img
                        className="products_img"
                        src={value?.images[0]?.src}
                        alt="#"
                      />
                      <h2 className="product_name">{value.name}</h2>
                      <span className="product_price">
                        ${value?.prices.price}
                      </span>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>Subtotal</th>
                <td>
                  <span>${cartData?.productCart?.totals?.total_items}</span>
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
          <button type="submit" className="checkout_proceed">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
