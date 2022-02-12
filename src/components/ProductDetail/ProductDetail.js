import React, { useState } from 'react';
import {useParams} from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    // console.log(productKey);
    // useParam get dainamic data from 'Link to'

    // const product = fakeData.find(pd => pd.key === productKey)
    // console.log(product);

    useEffect(()=>{
        fetch('https://ema-jhon-extra-server.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])

    return (
        <div>
            <h2>Your Product Details.</h2>
            <Product showAddToCart={false} product={product}/>
        </div>
    );
};

export default ProductDetail;