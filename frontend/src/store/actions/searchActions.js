import axios from 'axios';
import { HOST } from '../../constants';

export const searchProducts = (searchQuery) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${HOST}/api/product/search?searchQuery=${searchQuery}`);
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data });
        } catch (error) {
            console.error(error);
        }
    };
};