import {HOST} from '../../constants';
import axios from 'axios';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE';

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_CATEGORIES_REQUEST });

        axios
            .get(`${HOST}/api/categories`)
            .then((response) => {
                dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
            });
    };
};

export const fetchSubcategories = (categoryId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });

        axios
            .get(`${HOST}/api/categories/${categoryId}/subcategories`)
            .then((response) => {
                dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_SUBCATEGORIES_FAILURE, error });
            });
    };
};