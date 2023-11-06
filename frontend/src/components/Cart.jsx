// Cart.js
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,fetchCartItems } from '../store/modules/Cart/actions';
import OrderCard from "./OrderCard";
import NavPanel from "./NavPanel";
import ProductCard from "./ProductCard";
import CartItemCard from "./CartItemCard";
import {Button} from 'react-bootstrap';
import './Cart.scss';
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

    return (

        <div>
            <NavPanel />
            <div className='cart'>
            <div className='cart-items'>

            <h2>Your Shopping Cart</h2>
            {cartItems.map((cartItem) => {
                const product = products.find((product) => product.id === cartItem.ProductId);
                if (product) {
                    return (
                        <CartItemCard
                            key={cartItem.id} // Add a unique key
                            product={product}
                            cartItem={cartItem}
                            Liked={true}
                        />
                    );
                }

            })}
            </div>

            <div className='order-create-card'>
                <OrderCard cartItems={cartItems} total={total}/>
            </div>
            </div>
        </div>
    );
}

export default Cart;
