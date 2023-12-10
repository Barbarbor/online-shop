import React, { FC, useEffect } from 'react'

import { ICartItem } from '../../models/ICartItem';

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCartItems, removeFromCart } from '../../store/modules/Cart/cartActions';

import CartItemCard from '../common/CartItemCard';
import OrderCard from '../common/OrderCard';

import { CircularProgress,Container } from '@mui/material';
import '../../styles/Cart.scss';


const Cart : FC = () => {
    const dispatch = useAppDispatch();
    const {items: cartItems, products, total, isLoading} = useAppSelector(state => state.cartReducer);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);
    
    const handleRemoveFromCart = (product: ICartItem) => {
        dispatch(removeFromCart(product))
    }



    return (
        <div>
            <div className='cart'>
            <div className='cart-items'>

            {cartItems && cartItems.map((cartItem) => {
                const product = products.find((product) => product.id === cartItem.ProductId);
                if (product) {
                    return (
                        <CartItemCard
                            key={cartItem.id} // Add a unique key
                            product={product}
                            cartItem={cartItem}
                            liked={true}
                        />
                    );
                }
            })}
            </div>
                <OrderCard cartItems={cartItems} total={total}/>

            </div>
        </div>
  )
}

export default Cart