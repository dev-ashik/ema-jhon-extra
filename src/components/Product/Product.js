import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props.product);
  const { img, name, seller, price, stock, key } = props.product;

  return (
    <div className="product">
      <div className="productImage">
        <img src={img} alt="" /> 
      </div>
      <div className="productName">
        <h4><Link to={"/product/"+key}>{name}</Link></h4>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <br />
        <p>${price}</p>
        <br />
        <p>
          <small>Only{stock} left in stock - Order soon</small>
        </p>
        <button className="mainButton" onClick={() => props.handleAddProduct(props.product)}>
          <FaShoppingCart />
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
<h3>this is product</h3>;

// img
// key
// name
// price
// priceFraction
// seller
// shipping
// star:
// starCount
// stock:
// url:
// wholePrice:
