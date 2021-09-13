import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const rewiewItemStyle={
        borderBottom: '1px solid lightgray', 
        marginButton: '5px',
        paddingBottom: '5px',
        marginLeft: "200px"
    }
    const {name, quantity} = props.product;
    return (
        <div className='review_idtm'style={{borderBottom: '1px solid lightgray'}}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <br />
            <botton className="mainButton">Remove</botton>
        </div>
    );
};

export default ReviewItem;