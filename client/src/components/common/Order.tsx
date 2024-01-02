import React, { FC } from 'react';
import { IOrder } from '../../models/IOrder';
import { IOrderItem } from '../../models/IOrderItem';
import { Container, Typography } from '@mui/material';
import '../../styles/Order.scss';
import {IProduct} from "../../models/IProduct"; // Подключаем стили
import {ImageList, ImageListItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface OrderProps {
    order: IOrder;
    orderItems: IOrderItem[];
    products: IProduct[];
}

const Order: FC<OrderProps> = ({ order, orderItems, products }) => {
    const navigate = useNavigate();
    const toProductDetailNavigate = (productId:number) => {
        navigate(`/product/${productId}`);
    }
    return (
        <Container className="order-item-container">
            <Typography variant="h5">Order № {order.id}</Typography>
            <Typography>Order creation date:{new Date(order.order_date).toLocaleString()}</Typography>
            <Typography>Summ of order: {order.total}$</Typography>
            <Typography>Order status: {order.status}</Typography>
            <Typography variant="h6">Order items:</Typography>
            <ImageList className='image-container'>
                {Array.isArray(products) && products.map((item) => (
                    <ImageListItem key={item.photography_url}>
                        <img  src={item.photography_url}
                              alt={item.name}
                              loading="lazy"
                              className='image-container-item'
                              onClick={()=> toProductDetailNavigate(item.id)}
                        ></img> Quantity
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
};

export default Order;