import React, { FC } from 'react'

import { ICartItem } from '../../models/ICartItem';

import { useAppDispatch } from '../../hooks/redux'
import { createOrder } from '../../store/modules/Order/orderActions';

import { Card } from '@mui/material';
import '../../styles/Cart.scss';
import useMediaQuery from "@mui/material/useMediaQuery";


interface OrderCardProps {
    cartItems: ICartItem[];
    total: number;
}

const OrderCard : FC<OrderCardProps> = ({cartItems, total}) => {
    const dispatch = useAppDispatch();
    const handleCreateOrder = () => {
        dispatch(createOrder(cartItems, total));
    }
    let fontSize;
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px) and (min-width:586px)');
    const isSmallMobile = useMediaQuery('(max-width:585px)');
    if(isDesktop){
        fontSize = 20;

    }
    else if(isTablet) {
        fontSize=16;
    }
    else if(isMobile) {
        fontSize = 12;
    }
    else if(isSmallMobile) {
        fontSize = 10;
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
                <button className='create-order-button' onClick={handleCreateOrder} style={{fontSize:`${fontSize}px`}} > Create order </button>
        </Card>
    )
}

export default OrderCard