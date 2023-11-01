// Cart.js
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,fetchCartItems } from '../store/modules/Cart/actions';
import { createOrder } from '../store/modules/Order/actions';
import NavPanel from "./NavPanel";
import ProductCard from "./ProductCard";
import CartItemCard from "./CartItemCard";
import {Button} from 'react-bootstrap';
function Cart() {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const products = useSelector((state) =>state.cart.products );
    const total = useSelector((state) => state.cart.total);
    useEffect(() => {
        dispatch(fetchCartItems());
        },[dispatch]);
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleBuy = () => {
        dispatch(createOrder(cartItems));
    };

    return (
        <div>
            <NavPanel />
            <h2>Your Shopping Cart</h2>
            {cartItems.map((cartItem,productIndex) => (
                <div key={cartItem.id}>
                    <CartItemCard product={products[productIndex]} cartItem={cartItem} Liked={true} />

                </div>
            ))}
            <p>Total: ${total}</p>
            <Button onClick={handleBuy}>Buy</Button>
        </div>
    );
}

export default Cart;