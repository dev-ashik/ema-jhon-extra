import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({handlePlaceOrder}) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        // console.log('stripe integrated', error, paymentMethod);
        if(error){
            setPaymentError(error.message);
            setPaymentFinished(null);
        }else{
            setPaymentFinished(paymentMethod);
            const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4}
            handlePlaceOrder(payment);
            setPaymentError(null);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
            {/* cardnumber: 4242 4242 4242 4242 */}
            {paymentError && <p style={{color: "red"}}>{paymentError}</p>}
            {paymentFinished && <p style={{color: "green"}}>Payment Successfull</p>}
        </form>
    );
};

export default CheckoutForm;