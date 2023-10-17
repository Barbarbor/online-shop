// likeActions.js
import axios from 'axios';
import { HOST } from '../../constants';

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
