import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, clearLocalShoppingCart } from "../../utilities/databaseManager";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "./Shipment.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const stripePromise = loadStripe('pk_test_51KOcnlE6mLAE4h3PUxtfXb1ZSl4sQiPAd0AFk0dWetSkd0eSfTfSKHsd8eupNzwhnK4ekgz5SP6xilxSj5de4Zdq00eRzUaBDp');

  const onSubmit = (data) => {
    // console.log(data);
    setShipInfo(data);
  }

  // console.log(watch("example")); // watch input value by passing the name of it

  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shipInfo,
      payment: payment,
      orderTime: new Date()
    }

    fetch('https://ema-jhon-extra-server.herokuapp.com/addOrder', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)

    })
      .then(res => res.json())
      .then(order => {
        // console.log(order.insertedId);
        setOrderId(order.insertedId);
        clearLocalShoppingCart();
        
        //   // clear localstorage cart
        //   // give thanks to the user

        // if (order) {
        

        //   // clearLocalShoppingCart();
        //   // alert("your order placed successfully");
        // }
      })
  }

  return (
    <div className="shipmentPage">
      <div style={{ display: shipInfo ? 'none' : 'block' }} className="shipmentPage_userDetails">
        <h3>Shipment Information</h3>
        <form className="ship_form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} {...register("nameRequired", { required: true })} placeholder="your name" />
          {errors.nameRequired && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} {...register("emailRequired", { required: true })} placeholder="your Email" />
          {errors.emailRequired && <span className="error">Email is required</span>}

          <input name="address" {...register("addressRequired", { required: true })} placeholder="your address" />
          {errors.addressRequired && <span className="error">address is required</span>}

          <input name="phone" {...register("phoneNumberRequired", { required: true })} placeholder="your phone number" />
          {errors.phoneNumberRequired && <span className="error">Phone numer is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{ marginTop: '100px', display: shipInfo ? 'block' : 'none' }} className="shipmentPage_payment">
        <h3>Payment Information</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm handlePlaceOrder={handlePlaceOrder}/>
          {/* cardnumber: 4242 4242 4242 4242 */}
        </Elements>
        <br />
        {
          orderId && <div>
              <h3>Thank you for shopping with us</h3>
              <p>your order id is: {orderId}</p>
          </div>
        }
      </div>
    </div>


  );
};

export default Shipment;
