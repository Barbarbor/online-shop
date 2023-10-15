import axios from "axios";
import {HOST} from "../../constants";

export const fetchCartItems = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${HOST}/api/cartitems`);
            dispatch({
                type: 'FETCH_CART_ITEMS',
                payload: response.data,
            });
        } catch (error) {
            // Handle error
        }
    };
};