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

    return (
        <Container className="orders-container">
            <h2>Список заказов</h2>
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