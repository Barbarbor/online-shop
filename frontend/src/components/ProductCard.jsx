import React, {useState,useEffect} from 'react';
import { Card, Button,CardMedia, CardContent,CardHeader,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/modules/Cart/actions';
import { likeProduct,unlikeProduct } from '../store/modules/Like/actions';
import {fetchLikedProducts} from "../store/modules/Product/actions";
import heart from '../assets/icons/heart.svg';
import Like from './Like';
import { ReactSVG } from 'react-svg';
import './ProductCard.scss';
function ProductCard({ product, isLiked, inCart }) {
    const userId = 1;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const iconSize = 24;

    return (
        <Card className='product-card-container'>

                <CardMedia
                    className='product-card-media'
                    component="img"
                    src="media/iphone14.png"
                    alt={product.name} />


            <span className='product-card-name'>{product.name}</span>
            <span className='product-card-price'>{product.price} $</span>
            {!inCart ?
                (<button className='button-add-to-cart' onClick={handleAddToCart}>Add to Cart</button>)
                : (
                    <button className='button-in-cart'>To cart</button>
                ) }
                        <Like product={product} isLiked={isLiked}/>
        </Card>
    );
}

export default ProductCard;