
// subcategoryManagementActions.js

import { HOST } from '../../constants';
import axios from 'axios';
import {deleteCategoryFailure, deleteCategoryRequest, deleteCategorySuccess} from "./categoryManagementActions";

export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE';

export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';

export const DELETE_SUBCATEGORY_REQUEST ='DELETE_SUBCATEGORY_REQUEST';
export const DELETE_SUBCATEGORY_SUCCESS ='DELETE_SUBCATEGORY_SUCCESS';
export const DELETE_SUBCATEGORY_FAILURE ='DELETE_SUBCATEGORY_FAILURE';

export const deleteSubcategoryRequest = () => ({
    type: DELETE_SUBCATEGORY_REQUEST,
});
export const deleteSubcategorySuccess = (id) => ({
    type: DELETE_SUBCATEGORY_SUCCESS,
    payload:id,
});
export const deleteSubcategoryFailure = (error) => ({
    type: DELETE_SUBCATEGORY_FAILURE,
    error,
});


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

export const deleteSubcategory = (subcategoryId) => {
    return async(dispatch) => {
        dispatch(deleteSubcategoryRequest());
        try{
            await axios.delete(`${HOST}/api/subcategories/${subcategoryId}`);
            dispatch(deleteSubcategorySuccess(subcategoryId));
        } catch (error){
            dispatch(deleteSubcategoryFailure(error));
        }


    };
};
