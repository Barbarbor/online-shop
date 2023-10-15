import { HOST } from '../../constants';
import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchAllProducts = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        axios
            .get(`${HOST}/api/products`)
            .then((response) => {
                dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCTS_FAILURE, error });
            });
    };
};
