import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedProducts } from '../store/actions/likeActions';

function Liked() {
    const userId = 1; // Replace with the actual user's ID
    const likedProducts = useSelector((state) => state.likes.likedProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch liked products based on the user's ID
        dispatch(fetchLikedProducts(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <h1>Liked Products</h1>
            <ul>
                {likedProducts && likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))
                ) : (
                    <p>No liked products found.</p>
                )}
            </ul>
        </div>
    );
}

export default Liked;
