import React from "react";
import emaJhonLogo from "../../images/ema-jhonLogo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={emaJhonLogo} alt="" />
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Review</a>
        <a href="/inventory">Inventory</a>
      </nav>
    </div>
  );
};

export default Header;
