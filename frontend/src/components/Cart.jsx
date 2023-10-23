// Cart.js
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/cartActions';
import { createOrder } from '../store/actions/orderActions';
import {fetchAllProducts} from "../store/actions/mainPageActions";
import { fetchCartItems } from '../store/actions/cartItemActions';
import NavPanel from "./NavPanel";
function Cart() {
    const cartItems = useSelector((state) => state.cartItem.items);
    const total = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleBuy = () => {
        dispatch(createOrder(cartItems));
    };

    return (
        <div>
            <NavPanel/>
            <h2>Your Shopping Cart</h2>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <p>{item.name} - ${item.price}</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
                </div>
            ))}
            <p>Total: ${total}</p>
            <button onClick={handleBuy}>Buy</button>
        </div>
    );
}

export default Cart;
