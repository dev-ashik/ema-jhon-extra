import React from 'react';
import {useParams} from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    // console.log(productKey);
    // useParam get dainamic data from 'Link to'

    const product = fakeData.find(pd => pd.key === productKey)
    // console.log(product);

    return (
        <div>
            <h2>Your Product Details.</h2>
            <Product showAddToCart={false} product={product}/>
        </div>
    );
};

export default ProductDetail;