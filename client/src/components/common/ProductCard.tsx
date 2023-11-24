import React, { FC, useState, MouseEvent } from 'react'

import { IProduct } from '../../models/IProduct';

import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/modules/Cart/cartActions';

import Like from './Like';
import { Card, Button,CardMedia, CardContent,CardHeader,Typography } from '@mui/material';
import '../../styles/ProductCard.scss';
import AddToCart from './AddToCart';


interface ProductCardProps {
    product: IProduct;
    isLiked: boolean;
    inCart: boolean;
}

const ProductCard : FC<ProductCardProps> = ({product, isLiked, inCart}) => {
    const userId = 1;
    const navigate = useNavigate();

    const handleChildClick = (event: MouseEvent<HTMLDivElement>) => {
        // Предотвращаем всплытие события, чтобы оно не дошло до родительского обработчика
        event.stopPropagation();
        console.log('Child clicked');
    };

    const handleNavigationByClick = () =>{
        navigate(`product/${product.id}`);
    }

    return (
        <Card className='product-card-container' raised={true} onClick={handleNavigationByClick}>
            <div className='product-card-like-icon' onClick={(e) => handleChildClick(e)}>
            <Like product={product} isLiked={isLiked} />
            </div>
                <CardMedia
                    className='product-card-media'
                    component="img"
                    src="http://localhost:3000/media/iphone14.png"
                    alt={product.name} 
                    />
            <span className='product-card-name'>{product.name}</span>
            <span className='product-card-price'>{product.price} $</span>
            <div  onClick={(e) => handleChildClick(e) } >
            <AddToCart product={product} inCartInitial={inCart}/>
            </div>
        </Card>

    );
}

export default ProductCard;