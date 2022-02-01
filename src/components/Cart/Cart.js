import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const totalPrice = cart.reduce((totalPrice, product) => totalPrice + product.price,0);
    let totalPrice = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        console.log(product.price, product.quantity);
        totalPrice += product.price * product.quantity || 1;
        // debugger;
    }

    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }

    const vat = (totalPrice / 10).toFixed(2);
    const grandTotal = (totalPrice + shipping + Number(vat)).toFixed(2);

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h3>This is cart</h3>
            <p>Order Summary: {cart.length}</p>
            <p>Product Price: {formatNumber(totalPrice)}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p><small>Tax + Vat: {vat}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br />
            {
                props.children
            }
        </div>
    );
}; 

export default Cart;