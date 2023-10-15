// likedActions.js
import axios from 'axios';
import {HOST} from '../../constants';
export const fetchLikedProductDetails = (likedProductIds) => {
    return async (dispatch) => {
        try {
            const productDetails = await Promise.all(
                likedProductIds.map((productId) =>
                    axios.get(`${HOST}/products/${productId}`)
                )
            );

            dispatch({ type: 'SET_LIKED_PRODUCT_DETAILS', payload: productDetails });
        } catch (error) {
            console.error(error);
        }
    };
};

