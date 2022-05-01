import React, { useState } from 'react';
import {useParams} from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import Product from '../Product/Product';
import loadingGif from '../../images/loading.gif';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    document.title = 'Product Detail';
    // console.log(productKey);
    // useParam get dainamic data from 'Link to'

    // const product = fakeData.find(pd => pd.key === productKey)
    // console.log(product);


    useEffect(()=>{
        fetch('https://ema-jhon-extra-server.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [productKey])

    return (
        <div>
            <h2>Your Product Details.</h2>
            {
                loading ? <div style={{textAlign: 'center'}}><img src={loadingGif} alt="loading..." height='200' width='200'/></div> : 
                <Product showAddToCart={false} product={product}/>
            }
        </div>
    );
};

export default ProductDetail;