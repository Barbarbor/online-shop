import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/modules/Cart/actions';

function CartItemCard({ cartItem,product }) {
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem));
    };

    return (
        <div>d</div>
    );
}

export default CartItemCard;