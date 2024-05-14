import React from "react";
import "./style.css";

import Downloadbtn from "../DownloadBtn";


function Footer() {
  
  //year for copyrights
  const year = new Date().getFullYear();

  //button click handler
 

  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-main">
          <div className="footer-main_section1">
            <img src="/images/logo/logo-icon-transparent.png" alt="logo" />
            <h3>home</h3>
            <p className="footer-main_title2">of vendors</p>
            
          </div>
          <div className="footer-main_section2">
            <h4>Download Desktop App</h4>
            <p className="footer-main_section2-p">
              Make it easier for yourself to access all our services!
            </p>
            <div className="footer-main_section2-downloadBtns">
              <Downloadbtn text="Mac" image="apple-icon.png" />
              <Downloadbtn text="windows" image="windows-icon.png" />
            </div>
          </div>
          <div className="footer-main_section3">
            <h4>Install App</h4>
            <p className="footer-main_section3-p">
            Explore a vibrant collection of local delights, from farm-fresh produce to handcrafted goods, all curated to bring the best of the community directly to you!
            </p>
            <div className="footer-main_section3-downloadBtns">
              <Downloadbtn text="Google Play" image="play-store-icon.png" />
              <Downloadbtn text="App Store" image="app-store-icon.png" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-bottom_copyrights">
            © {year} GourmetGrooveGoods (G3)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
