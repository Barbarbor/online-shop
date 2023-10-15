
// subcategoryManagementActions.js

import { HOST } from '../../constants';
import axios from 'axios';

export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE';

export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';

export const fetchSubcategories = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
        try {
            const response = await axios.get(`${HOST}/api/subcategories`);
            dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_SUBCATEGORIES_FAILURE, error });
        }
    };
};

export const addSubcategory = (newSubcategory) => {
    return async (dispatch) => {
        dispatch({ type: ADD_SUBCATEGORY_REQUEST });
        try {
            const response = await axios.post(`${HOST}/api/subcategories`, {
                name: newSubcategory.name,
                CategoryId: +newSubcategory.CategoryId,
            });
            dispatch({ type: ADD_SUBCATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_SUBCATEGORY_FAILURE, error });
        }
    };
};
