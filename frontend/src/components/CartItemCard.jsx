import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {updateQuantity } from '../store/modules/Cart/actions';
import{likeProduct,unlikeProduct} from "../store/modules/Like/actions";
import { Card, CardMedia, CardContent, Typography, TextField, Button } from '@mui/material';
import './Cart.scss';
import Like from'./Like';
import Trash from './Trash';
function CartItemCard({ cartItem, product, Liked }) {
    const [quantity,setQuantity] = useState(cartItem.quantity);
    const dispatch = useDispatch();
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantity(cartItem, quantity + 1));
        };
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(updateQuantity(cartItem, quantity - 1));
        }
        };

    const handleUpdateQuantity = (event) => {
        const value = parseInt(event.target.value);
        if (isNaN(value) || value <= 0) {
            // Если значение пустое, неправильное или меньше или равно 0, устанавливаем значение по умолчанию
            setQuantity(1);
            dispatch(updateQuantity(cartItem, 1));
        }
        else {
            setQuantity(value);
            dispatch(updateQuantity(cartItem, value));
        }
    };

    const calculateTotalPrice = () => {
        return product.price * quantity;
    };

    return (
            <Card className="card-container">
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
                        <Like product={product} isLiked={Liked}/>
                        <Trash cartItem={cartItem}/>
                    </div>
                </div>

                  <div className='quantity'>
                      <div className='total-price'>
                       <span className='price-text'>Sum: {quantity*product.price}</span>
                      </div>
                      <div className='quantity-control'>
                          <button className='decrease-button' onClick={handleDecreaseQuantity} disabled={quantity === 1}>-</button>
                          <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size='small' className='quantity-input-field' onChange={handleUpdateQuantity} value={quantity} defaultValue={1}> </TextField>
                          <button className='increase-button' onClick={handleIncreaseQuantity}>+</button>
                      </div>
                  </div>

            </Card>

    );
}

export default CartItemCard;
