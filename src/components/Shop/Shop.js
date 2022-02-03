import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    fetch('https://ema-jhon-extra-server.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setProduct(data))
  }, [])

  useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)
    // console.log(products, productKeys);
    fetch('https://ema-jhon-extra-server.herokuapp.com/productsByKeys', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
    
  },[])


  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if(sameProduct){
      const count = sameProduct.length + 1;
      sameProduct.quantity = count; 
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct]; 
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twinContainer">
      <div className="productContainer">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            product={product}
            handleAddProduct={handleAddProduct}
          />
        ))}
      </div>
      <div className="cartContainer">
        <Cart cart={cart} >
          <Link to="/review">
            <button className="mainButton">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
