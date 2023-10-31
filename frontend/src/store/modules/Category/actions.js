import {HOST} from '../../../constants';
import axios from 'axios';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';


export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';


export const DELETE_CATEGORY_REQUEST ='DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS ='DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE ='DELETE_CATEGORY_FAILURE';


export const fetchCategoriesRequest = () => ({
    type:FETCH_CATEGORIES_REQUEST,
});
export const fetchCategoriesSuccess = (categories) => ({
    type:FETCH_CATEGORIES_SUCCESS,
    payload:categories,
});
export const fetchCategoriesFailure = (error) => ({
    type:FETCH_CATEGORIES_FAILURE,
    error,
});


export const addCategoryRequest = () => ({
    type: ADD_CATEGORY_REQUEST,
});
export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload:category,
});
export const addCategoryFailure = (error) => ({
    type: ADD_CATEGORY_FAILURE,
    error,
});


export const deleteCategoryRequest = () => ({
    type: DELETE_CATEGORY_REQUEST,
});
export const deleteCategorySuccess = (id) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload:id,
});
export const deleteCategoryFailure = (error) => ({
    type: DELETE_CATEGORY_FAILURE,
    error,
});


export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesRequest());
        try {
            const response = await axios.get(`${HOST}/api/categories`);
            dispatch(fetchCategoriesSuccess(response.data));
        }
        catch(error){
            dispatch(fetchCategoriesFailure(error));
        }
    };
};


export const addCategory = (newCategory) => {
    return async (dispatch) => {
        dispatch(addCategoryRequest());
        try {
            const response = await axios.post(`${HOST}/api/categories`, newCategory);
            dispatch(addCategorySuccess(response.data));
        } catch (error) {
            dispatch(addCategoryFailure(error));
        }
    };
};


export const deleteCategory = (categoryId) => {
    return async(dispatch) => {
        dispatch(deleteCategoryRequest());
        try{
            await axios.delete(`${HOST}/api/categories/${categoryId}`);
            dispatch(deleteCategorySuccess(categoryId));
        } catch (error){
            dispatch(deleteCategoryFailure(error));
        }
    };
};