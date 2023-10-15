import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedProductDetails } from '../store/actions/likedActions';

function Liked() {
    const likedProductIds = useSelector((state) => state.likes.products);
    const likedProductDetails = useSelector((state) => state.liked.likedProductDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLikedProductDetails(likedProductIds));
    }, [dispatch, likedProductIds]);

    return (
        <div>
            <h1>Liked Products</h1>
            <ul>
                {likedProductDetails.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Liked;
