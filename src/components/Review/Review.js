import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../../components/Cart/Cart";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [ orderPlaced, setOrderPlaced ] = useState(false);
  const history = useHistory();
  console.log(history);

  const handleProceedCheckout = () => {
    history.push("/shipment");
  }

  const removeProduct = (productKey) => {
    const newCart = cart.filter(pd=>pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };


  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('http://localhost:5000/productsByKeys', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))

    // const cartProducts = productKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = savedCart[key];
    //   return product;
    // });
    // setCart(cartProducts);
    // console.log(cartProducts);
  }, []);

  const thankyou = <img src={happyImage} alt="happyImage" />

  return (
    <div className='twinContainer'>
      <div className='productContainer'>
        {cart.map((pd) => (
            <ReviewItem key={pd.key} 
            removeProduct={removeProduct} 
            product={pd} />
        ))}
        {
          orderPlaced && thankyou
        }
      </div>
      <div className="cartContainer">
            <Cart  cart={cart}>
                <button onClick={handleProceedCheckout} className="mainButton">Proceed Checkout</button>
            </Cart>
      </div>
    </div>
  );
};

export default Review;
