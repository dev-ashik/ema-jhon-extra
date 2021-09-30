import React from 'react';

const ReviewItem = (props) => {
    const rewiewItemStyle={
        borderBottom: '1px solid lightgray', 
        marginButton: '5px',
        paddingBottom: '5px',
        marginLeft: "200px"
    }
    const {name, quantity, key, price} = props.product;
    return (
        <div className='rewiewItemStyle'style={rewiewItemStyle}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <botton onClick={() => props.removeProduct(key)} className="mainButton">Remove</botton>
        </div>
    );
};

export default ReviewItem;