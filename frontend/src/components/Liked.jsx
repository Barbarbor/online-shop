import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedProducts } from '../store/actions/likeActions';
import NavPanel from "./NavPanel";
import ProductCard from "./ProductCard";
function Liked() {
    const userId = 1; // Replace with the actual user's ID
    const likedProducts = useSelector((state) => state.likes.products);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch liked products based on the user's ID
        dispatch(fetchLikedProducts(userId));
    }, [dispatch, userId]);

    return (

        <div>
            <NavPanel/>
            <h1>Liked Products</h1>

                {likedProducts && likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                    <p>No liked products found.</p>
                )}

        </div>
    );
}

export default Liked;
