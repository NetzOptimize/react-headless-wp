// ** Library Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Assets Imports
import cartSvg from "../assets/images/cart-svg.svg";

// ** Style Imports
import "../styles/components/Navbar.css";

// ** Module Imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductCart } from "../redux/slices/getCartSlice";
import { getMenu } from "../redux/slices/menuSlice";
import { getLogo } from "../redux/slices/logoSlice";

const Navbar = () => {
  const navigate = useNavigate();

  // ** Dispatch an action
  const dispatch = useAppDispatch();

  // ** Retrieve redux state's value
  const cartValues = useAppSelector((state) => state.getCart);
  const headerMenu = useAppSelector((state) => state.menus);
  const productMedia = useAppSelector((state) => state.media);

  // ** Set state's data
  const [menu, setMenus] = useState([]);
  const [media, setMedia] = useState([]);

  // ** Retrieve updated value of the cart
  useEffect(() => {
    dispatch(getProductCart());
    dispatch(getMenu());
    dispatch(getLogo());
  }, [dispatch]);

  useEffect(() => {
    const mainMenu = headerMenu.menus.filter((value) => {
      return value.parent === 0;
    });
    setMenus(mainMenu);
    setMedia(productMedia);
  }, [headerMenu, productMedia]);

  return (
    <div className="nav_wrapper">
      <section className="nav_sub_wrapper">
        <div className="nav_menu">
          <img
            onClick={() => navigate("/")}
            className="logo"
            src={media?.media?.source_url}
            alt="NetzOptimize"
          />
          <ul className="nav_menu_list">
            {/* {menu?.map((menus, key) => {
              return (
                <li key={key} onClick={() => navigate(menus.title.rendered)}>
                  {menus.title.rendered}
                </li>
              );
            })} */}
            <li onClick={() => navigate("/Shop")}>{menu[0]?.title.rendered}</li>
          </ul>
          <div className="cart" onClick={() => navigate("/cart")}>
            <div className="cart_count">
              <span>{cartValues?.productCart?.items_count || 0}</span>
            </div>
            <div className="cart_image">
              <img src={cartSvg} alt="#" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
