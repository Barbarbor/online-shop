import React, {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart,fetchCartItems } from '../../store/modules/Cart/actions';

import OrderCard from "../common/OrderCard";
import NavPanel from "../common/NavPanel";
import CartItemCard from "../common/CartItemCard";

import '../../styles/Cart.scss';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const products = useSelector((state) =>state.cart.products );
    const total = useSelector((state) => state.cart.total);
    const loading = useSelector((state) => state.cart.loading );
    useEffect(() => {
        dispatch(fetchCartItems());
        },[dispatch]);


    if(loading)
        return(
            <div>Loading...</div>
        )

    return (

        <div>
            <NavPanel />
            <div className='cart'>
            <div className='cart-items'>


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
