import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOrders } from '../../store/modules/Order/orderActions';
import { useUser } from '../../hooks/useUser';
import { Container } from '@mui/material';
import Order from '../common/Order';
import '../../styles/Order.scss';

const Orders = () => {
    const { currentUser } = useUser();
    const dispatch = useAppDispatch();
    const { orders: ordersList } = useAppSelector((state) => state.orderReducer);

    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.id;
            dispatch(fetchOrders(userId));
        }
    }, [currentUser, dispatch]);
    if(!currentUser)
        return(
            <div style={{right:'50%',top:'50%',position:'absolute'}}> To watch orders, you should to be log in</div>
        )
    else
    return (
        <Container className="orders-container">

            {ordersList.map((order) => (
                <Order
                    key={order.order.id}
                    order={order.order}
                    orderItems={order.orderItems}
                    products={order.products}/>
            ))}
        </Container>
    );
};

export default Orders;