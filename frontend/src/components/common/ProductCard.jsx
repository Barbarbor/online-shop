import React from 'react';
import {Link,useNavigate} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/modules/Cart/actions';

import Like from './Like';
import AddToCart from "./AddToCart";

import '../../styles/ProductCard.scss';

import { Card, Button,CardMedia, CardContent,CardHeader,Typography } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";

function ProductCard({ product, isLiked, inCart }) {
    const userId = 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChildClick = (event) => {
        // Предотвращаем всплытие события, чтобы оно не дошло до родительского обработчика
        event.stopPropagation();
        console.log('Child clicked');
    };
    const handleNavigationByClick = () =>{
        navigate(`product/${product.id}`);
    }


    return (


        <Card className='product-card-container' raised={true} onClick={handleNavigationByClick}>
            <div className='product-card-like-icon' onClick={(e) =>handleChildClick(e)}>
            <Like product={product} isLiked={isLiked} />
            </div>

                <CardMedia
                    className='product-card-media'
                    component="img"
                    src="http://localhost:3000/media/iphone14.png"
                    alt={product.name} />



            <span className='product-card-name'>{product.name}</span>
            <span className='product-card-price'>{product.price} $</span>

            <div onClick={(e) => handleChildClick(e) } >
            <AddToCart product={product} inCartInitial={inCart}/>
            </div>
        </Card>

    );
}

export default ProductCard;