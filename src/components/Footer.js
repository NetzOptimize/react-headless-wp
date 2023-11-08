// ** Library Imports
import React, { useEffect } from "react";

// ** Style Imports
import "../styles/components/Footer.css";

// ** Module Imports
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLogo } from "../redux/slices/logoSlice";

const Footer = () => {
  // ** Dispatch an action
  const dispatch = useAppDispatch();
  const logo = useAppSelector((state) => state.media);

  useEffect(() => {
    dispatch(getLogo());
  }, [dispatch]);

  return (
    <div className="container">
      <header className="footer_header">
        <h1>Protect your boat with PilePad.</h1>
        <h1>We are soft, durable and removable dock protection systems.</h1>
        <button className="footer_shop_button">SHOP NOW</button>
      </header>
      <nav className="navigation">
        <div className="logo-section">
          <img src={logo?.media?.source_url} alt="here" />
          <h3>
            A stress-free <br />
            docking experience.
          </h3>
        </div>
        <div className="nav-section">
          <h2>SHOP</h2>
          <ul>
            <li>PilePad</li>
            <li>PilePad Slim</li>
            <li>SlidePad</li>
          </ul>
        </div>
        <div className="nav-section">
          <h2>EXPLORE</h2>
          <ul>
            <li>FAQs</li>
            <li>Installation</li>
            <li>Newsroom</li>
            <li>About</li>
            <li>Be a PilePad Reseller</li>
          </ul>
        </div>
        <div className="nav-section custom">
          <h2>CUSTOM ORDERS</h2>
          <p>
            If you are looking for a custom PilePad, please contact at the below
            email address.
          </p>
          Orders@PilePad.com
        </div>
      </nav>
    </div>
  );
};

export default Footer;
