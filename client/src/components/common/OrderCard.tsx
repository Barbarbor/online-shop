import React, { FC } from 'react'

import { ICartItem } from '../../models/ICartItem';

import { useAppDispatch } from '../../hooks/redux'
import { createOrder } from '../../store/modules/Order/orderActions';

import { Card } from '@mui/material';
import '../../styles/Cart.scss';

interface OrderCardProps {
    cartItems: ICartItem[];
    total: number;
}

const OrderCard : FC<OrderCardProps> = ({cartItems, total}) => {
    const dispatch = useAppDispatch();
    const handleCreateOrder = () => {
        dispatch(createOrder(cartItems, total));
    }

    const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
    }, 0);
    
    return (
        <Card className="order-container" raised={true}>
            <div className="order-info">
                <p> Items in order: {totalQuantity}</p>
                <p> Summ of order: {total}</p>
            </div>
                <button className='create-order-button' onClick={handleCreateOrder}> Create order </button>
        </Card>
    )
}

export default OrderCard