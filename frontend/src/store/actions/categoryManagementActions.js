import { HOST } from '../../constants';
import axios from 'axios';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORIES_REQUEST });
        try {
            const response = await axios.get(`${HOST}/api/categories`);
            dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
        }
    };
};

export const addCategory = (newCategory) => {
    return async (dispatch) => {
        dispatch({ type: ADD_CATEGORY_REQUEST });
        try {
            const response = await axios.post(`${HOST}/api/categories`, newCategory);
            dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_CATEGORY_FAILURE, error });
        }
    };
};