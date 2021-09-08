import React, { useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="shopContainer">
      <div className="productContainer">
        {products.map((product) => (
          <Product product={product} handleAddProduct={handleAddProduct} />
        ))}
      </div>
      <div className="cartContainer">
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
