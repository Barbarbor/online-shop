import { HOST } from '../../constants';
import axios from 'axios';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProduct = (productId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });

        axios
            .get(`${HOST}/api/products/${productId}`)
            .then((response) => {
                dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCT_FAILURE, error });
            });
    };
};
