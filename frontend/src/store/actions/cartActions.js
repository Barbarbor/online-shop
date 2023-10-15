// cartActions.js
import axios from 'axios';
import { HOST } from '../../constants';

export const addToCart = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${HOST}/api/cartitems`, {
                quantity: 1,
                UserId: 1, // Replace with user authentication when available
                ProductId: productId.id,
            });
            dispatch({
                type: 'ADD_TO_CART',
                payload: response.data,
            });
        } catch (error) {
            // Handle error
        }
    };
};
export const removeFromCart = (productId) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: productId,
    };
};
