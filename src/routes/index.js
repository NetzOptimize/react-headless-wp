// ** Library Imports
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Module Imports
import Store from "../pages/Store";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const index = () => {
  const Layout = ({ children }) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/Shop"
          element={
            <Layout>
              <Store />
            </Layout>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
