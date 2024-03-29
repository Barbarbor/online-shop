import React, { FC } from 'react'

import { ICartItem } from '../../models/ICartItem';
import {useUser} from "../../hooks/useUser";
import { useAppDispatch } from '../../hooks/redux'
import { createOrder } from '../../store/modules/Order/orderActions';

import {Card} from '@mui/material';

import useMediaQuery from "@mui/material/useMediaQuery";


interface OrderCardProps {
    cartItems: ICartItem[];
    total: number;
}

const OrderCard : FC<OrderCardProps> = ({cartItems, total}) => {
    const {currentUser} = useUser();
    const dispatch = useAppDispatch();
    const handleCreateOrder = () => {
        if(currentUser){
            const userId = currentUser.id;
            dispatch(createOrder(cartItems, total,userId));
            alert("Order created successfully!");
        }

    }
    let fontSize;
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px) and (min-width:586px)');
    const isSmallMobile = useMediaQuery('(max-width:540px)');
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
    if(!isSmallMobile)
        return (
            <Card className="order-container" raised={true}>
                <div className="order-info">
                    <p> Items in order: {totalQuantity}</p>
                    <p> Summ of order: {total}</p>
                </div>
                    <button className='create-order-button' onClick={handleCreateOrder} style={{fontSize:`${fontSize}px`}} > Create order </button>
            </Card>
        )
    else
        return (
            <Card className='order-container-small'>
                <div className='order-info-small'>
                    <p> Items:{totalQuantity}</p>
                    <p> Summ: {total}</p>
                </div>
                <button className='create-order-button-small' onClick={handleCreateOrder} style={{fontSize:`${fontSize}px`}}> Create order</button>
            </Card>
        )
}

export default OrderCard;