// likeActions.js
import axios from 'axios';
import {HOST} from '../../constants';
export const likeProduct = (ProductId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${HOST}/api/likes`, {
                UserId: 1, // Replace with actual user ID once authentication is implemented
                ProductId,
            });
            dispatch({ type: 'LIKE_PRODUCT', payload: ProductId });
        } catch (error) {
            console.error(error);
        }
    };
};
