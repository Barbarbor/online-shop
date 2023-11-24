import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLikedProducts } from '../../store/modules/Product/productActions';
import { fetchCartItems } from '../../store/modules/Cart/cartActions';

import ProductCard from '../common/ProductCard';

const Liked = () => {
    const userId = 1;
    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    const {products: cartProducts} = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLikedProducts(userId));
        dispatch(fetchCartItems());
    }, [dispatch, userId])
    
    return (
        <div>
            {likedProducts && likedProducts.length > 0 ? (
                likedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isLiked={true}
                        inCart={cartProducts.some(cartProduct => cartProduct.id === product.id)}/>
                ))
            ) : (
                <p>No liked products found.</p>
            )}
        </div>
    )
}

export default Liked;