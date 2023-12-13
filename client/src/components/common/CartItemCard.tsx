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
    userId: number;
}

const CartItemCard : FC<CartItemCardProps> = ({cartItem, product, liked,userId}) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const dispatch = useAppDispatch();

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantity(cartItem, quantity + 1,userId));
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(updateQuantity(cartItem, quantity - 1,userId));
        }
        else {
            dispatch(removeFromCart(cartItem,userId));
        }  
    }

    const handleUpdateQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value) || value <= 0) {
            setQuantity(1);
            dispatch(updateQuantity(cartItem, 1,userId));
        }
        else {
            setQuantity(value);
            dispatch(updateQuantity(cartItem, value,userId));
        }
    }

    return (
        <Card className="card-container" raised={true}>
            <CardMedia
                component="img"
                image={product.photography_url}
                alt="Product"
                className="card-media"
            />
            <div className="card-content">
                <CardContent className='card-content-text'>
                    <Typography variant="body1" className='card-content-text-typography'>
                        {product.name}
                    </Typography>
                </CardContent>
                <div className="card-icons">
                    <Like product={product} isLiked={liked}/>
                    <Trash cartItem={cartItem} userId={userId}/>
                </div>
            </div>

            <div className='quantity'>
                <div className='total-price'>
                    <span className='price-text'>Sum: {quantity*product.price}</span>
                </div>
                <div className='quantity-control'>
                    <button className='decrease-button' onClick={handleDecreaseQuantity}>-</button>
                    <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', className:'font-size' }} size='small' className='quantity-input-field' onChange={handleUpdateQuantity} value={quantity} defaultValue={1}> </TextField>
                    <button className='increase-button' onClick={handleIncreaseQuantity}>+</button>
                </div>
            </div>

        </Card>
    );  
}

export default CartItemCard;