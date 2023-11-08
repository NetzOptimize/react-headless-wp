// ** Library Imports
import React from "react";

//  ** Assets Imports
import homeBanner from "../assets/images/homepage-banner.jpg";
import USA from "../assets/images/USA.png";
import whyPilePad from "../assets/images/why-pilepad.png";
import without from "../assets/images/without-pilepad.png";
import straight from "../assets/images/STRAIGHT-PilePad-Slim.jpg";
import angled from "../assets/images/ANGLED-PilePad.jpg";
import water from "../assets/images/water-image.jpg";
import PILEPAD_INSTALLATION from "../assets/images/pilepad-installation.jpg";
import PILEPAD_1 from "../assets/images/pilepad-1.webp";

// ** Style Imports
import "../styles/pages/Home.css";

// import { getPage } from "../redux/slices/pagesSlice";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { Parser } from "html-to-react";

const Home = () => {
  // const dispatch = useAppDispatch();

  // ** Retrieve redux state's value
  // const pageData = useAppSelector((state) => state.pages);

  // useEffect(() => {
  //   dispatch(getPage("/15883"));
  // }, [dispatch]);

  return (
    // <>{Parser().parse(pageData?.page?.content?.rendered)}</>
    <div className="home_main_wrapper">
      <div className="home_sub_wrapper">
        <img src={homeBanner} className="home_banner" alt="#" />
        <div className="swiper_contents">
          <div className="swiper_heading">GET 10% OFF</div>
          <div className="swiper_description">
            Want 10% off your first order? Use “PROTECT” at checkout and get
            protected with PilePad.
          </div>
          <button className="shop_button">Shop Now</button>
        </div>
      </div>
      <div className="home_body">
        <div className="heading_wrapper">
          <h3 className="body_heading">Compare Products</h3>
          <h4 className="body_sub_heading">
            Our collection of PilePad products are designed to provide
            paint-safe protection for your boat in various applications.
          </h4>
        </div>
        <div className="usa_log">
          <img src={USA} alt="#" />
          <h2 className="made_in">
            Made in the USA and distributed Nationwide.
          </h2>
        </div>
        <section className="pilePad_info_wrapper">
          <div className="pilePad_info">
            <div className="without_pilePad">
              <img src={without} alt="#" />
            </div>
            <div className="why_pilePad">
              <h2>WHY PILEPAD?</h2>
              <h3>
                When dockside mistakes cost thousands, boaters turn to PilePad.
              </h3>
              <p>
                PilePad products wrap pilings and other obstructions with dense
                padding and a protective, paint-saving shell. PilePad products
                are easy to install, UV-resistant and extremely kind to your
                boat’s paint job.
              </p>
              <p>
                No more time and money lost while you repair pesky scratches. No
                more rubber marks from commercial dock posts. No more dockside
                anxiety.
              </p>
            </div>
            <div className="with_pilePad">
              <img src={whyPilePad} alt="#" />
            </div>
          </div>
        </section>
        <section className="latest_product">
          <div className="latest_product_sub_wrapper">
            <div className="angled">
              <img src={angled} alt="#" />
              <div className="comparison_product_content">
                <h2>PILEPAD</h2>
                <p>
                  Reduce docking stress <br />
                  with 4 feet of PilePad protection, <br />
                  and expand with PilePad Mini.
                </p>
                <button className="buy_now">Buy Now</button>
              </div>
            </div>
            <div className="straight">
              <img src={straight} alt="#" />
              <div className="comparison_product_content">
                <h2>PILEPAD SLIM</h2>
                <p>
                  No more dockside damage. <br />
                  Start with 4 feet of protection
                  <br />
                  and expand with Slim Mini.
                </p>
                <button className="buy_now">Buy Now</button>
              </div>
            </div>
          </div>
        </section>
        <section className="installation_wrapper">
          <img src={water} alt="#" />
          <div className="installation_sub_wrapper">
            <div className="installation">
              <img src={PILEPAD_INSTALLATION} alt="#" />
              <h2>PILEPAD INSTALLATION</h2>
              <p>
                Learn more about PilePad’s Certified
                <br /> Installer Network.
              </p>
            </div>
            <div className="installation">
              <img src={PILEPAD_1} alt="#" />
              <h2>INSTALLATION GUIDE</h2>
              <p>
                Tips and tricks to get the most <br />
                out of your PilePad.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
