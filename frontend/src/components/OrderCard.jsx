import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {createOrder} from "../store/modules/Order/actions";
import { Card, CardMedia, CardContent, Typography, TextField, Button } from '@mui/material';
import './Cart.scss';
function OrderCard ({cartItems,total}) {
    const dispatch = useDispatch();
    const handleCreateOrder = () =>{
        dispatch(createOrder(cartItems,total));
    };
    const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
    }, 0);
    return(
        <Card className="order-container" raised={true}>
            <div className="order-info">
                <p> Items in order: {totalQuantity}</p>
                <p> Summ of order: {total}</p>
            </div>
                <button className='create-order-button' onClick={handleCreateOrder}> Create order </button>


        </Card>
    )
}
export default OrderCard;