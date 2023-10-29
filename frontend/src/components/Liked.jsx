import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedProducts } from '../store/modules/Product/actions';
import NavPanel from "./NavPanel";
import ProductCard from "./ProductCard";
import {fetchCartItems} from "../store/modules/Cart/actions";

function Liked() {
    const userId = 1; // Replace with the actual user's ID
    const likedProducts = useSelector((state) => state.likedProducts.products);
    const cart_products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch liked products based on the user's ID
        dispatch(fetchLikedProducts(userId));
        dispatch(fetchCartItems());
    }, [dispatch, userId]);

    return (

        <div>
            <NavPanel/>
            <h1>Liked Products</h1>

                {likedProducts && likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isLiked={true}
                            inCart={cart_products.some(cartProduct => cartProduct.id === product.id)}/>
                    ))
                ) : (
                    <p>No liked products found.</p>
                )}

        </div>
    );
}

export default Liked;
