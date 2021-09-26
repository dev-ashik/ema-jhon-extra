import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";
import emaJhonLogo from "../../images/ema-jhonLogo.png";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={emaJhonLogo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button onClick={()=>setLoggedInUser({})}>Sign out</button>
      </nav>
    </div>
  );
};

export default Header;
