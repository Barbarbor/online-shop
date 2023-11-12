import React, {useState,useEffect} from 'react';
import { Card, Button,CardMedia, CardContent,CardHeader,Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/modules/Cart/actions';
import Like from './Like';
import './ProductCard.scss';
function ProductCard({ product, isLiked, inCart }) {
    const userId = 1;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const iconSize = 24;

    return (
        <Card className='product-card-container' raised={true}>
            <div className='product-card-like-icon'>
            <Like product={product} isLiked={isLiked} />
            </div>
                <CardMedia
                    className='product-card-media'
                    component="img"
                    src="http://localhost:3000/media/iphone14.png"
                    alt={product.name} />


            <span className='product-card-name'>{product.name}</span>
            <span className='product-card-price'>{product.price} $</span>
            {!inCart ?
                (<button className='button-add-to-cart' onClick={handleAddToCart}>Add to Cart</button>)
                : (
                    <button className='button-in-cart'>To cart</button>
                ) }

        </Card>
    );
}

export default ProductCard;