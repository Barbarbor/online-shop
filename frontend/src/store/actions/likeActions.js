import {HOST} from '../../constants';
import axios from 'axios';

export const likeProduct = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${HOST}/api/likes`, {
                UserId: 1, // Replace with actual user ID once authentication is implemented
                ProductId:productId,
            });
            dispatch({ type: 'LIKE_PRODUCT', payload: productId });
        } catch (error) {
            console.error(error);
        }
    };
};
export const fetchLikedProducts = (userId) => {
    return async (dispatch) => {
        try {
            // Make a GET request to fetch liked products by user ID
            const response = await axios.get(`${HOST}/api/likes?UserId=${userId}`);

            // Dispatch the action with the fetched liked products
            dispatch({ type: 'FETCH_LIKED_PRODUCTS', payload: response.data });
        } catch (error) {
            console.error(error);
        }
    };
};
