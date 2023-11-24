import React, { ChangeEvent, FC, useState } from 'react'

import { ICartItem } from '../../models/ICartItem';
import { IProduct } from '../../models/IProduct';

import { useAppDispatch } from '../../hooks/redux';
import { removeFromCart, updateQuantity } from '../../store/modules/Cart/cartActions';

import Like from './Like';
import Trash from './Trash';

import { Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import '../../styles/Cart.scss';


interface CartItemCardProps {
    cartItem: ICartItem;
    product: IProduct;
    liked: boolean;
}

const CartItemCard : FC<CartItemCardProps> = ({cartItem, product, liked}) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const dispatch = useAppDispatch();

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantity(cartItem, quantity + 1));
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(updateQuantity(cartItem, quantity - 1));
        }
        else {
            dispatch(removeFromCart(cartItem));
        }  
    }

    const handleUpdateQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value) || value <= 0) {
            setQuantity(1);
            dispatch(updateQuantity(cartItem, 1));
        }
        else {
            setQuantity(value);
            dispatch(updateQuantity(cartItem, value));
        }
    }

    return (
        <Card className="card-container" raised={true}>
            <CardMedia
                component="img"
                image="media/iphone14.png"
                alt="Product"
                className="card-media"
            />
            <div className="card-content">
                <CardContent>
                    <Typography variant="body1" style={{ maxWidth: '300px' }}>
                        {product.name}
                    </Typography>
                </CardContent>
                <div className="card-icons">
                    <Like product={product} isLiked={liked}/>
                    <Trash cartItem={cartItem}/>
                </div>
            </div>

            <div className='quantity'>
                <div className='total-price'>
                    <span className='price-text'>Sum: {quantity*product.price}</span>
                </div>
                <div className='quantity-control'>
                    <button className='decrease-button' onClick={handleDecreaseQuantity}>-</button>
                    <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size='small' className='quantity-input-field' onChange={handleUpdateQuantity} value={quantity} defaultValue={1}> </TextField>
                    <button className='increase-button' onClick={handleIncreaseQuantity}>+</button>
                </div>
            </div>

        </Card>
    );  
}

export default CartItemCard;