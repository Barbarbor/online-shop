import React, { FC, useEffect } from 'react'
import {useUser} from "../../hooks/useUser";
import { ICartItem } from '../../models/ICartItem';

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCartItems, removeFromCart } from '../../store/modules/Cart/cartActions';

import CartItemCard from '../common/CartItemCard';
import OrderCard from '../common/OrderCard';

import { CircularProgress,Container } from '@mui/material';
import '../../styles/Cart.scss';
import {RootState} from "../../store/store";


const Cart : FC = () => {
    const {currentUser} = useUser();
    let userId:number;
    if(currentUser){
        userId = currentUser.id;
    }
    else{
        userId = 1;
    }
    const dispatch = useAppDispatch();

    console.log(`CurrentUser:${currentUser}`);
// Проверка наличия объекта и его свойств
    const { cartitems: cartItems, products, total } = useAppSelector( (state) => state.cartReducer);

    useEffect(() => {
        const fetchData = async () => {
            // Проверяем, есть ли текущий пользователь
            if (currentUser) {
                try {
                    // Выполняем fetchCartItems только если есть текущий пользователь
                    dispatch(fetchCartItems(currentUser.id));
                } catch (error) {
                    console.error('Ошибка при загрузке корзины:', error);
                }
            }
        };

        fetchData(); // Вызываем функцию загрузки данных

    }, [currentUser]);
    
    const handleRemoveFromCart = (product: ICartItem) => {
        dispatch(removeFromCart(product,userId))
    }


    if(!currentUser) {
        return (
            <div style={{right: '50%', top: '50%', position: 'absolute'}}> To watch the cart, you should be log in</div>
        )
    }
    if(cartItems.length == 0){
        return(
            <div style={{right:'50%',top:'50%',position:'absolute'}}> No items in Cart</div>
        )
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
                            userId={userId}
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