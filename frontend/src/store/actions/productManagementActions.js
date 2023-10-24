// productManagementActions.js

import axios from 'axios';
import { HOST } from '../../constants';

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
// Action creators
export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    error,
});

export const addProductRequest = () => ({
    type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
});

export const addProductFailure = (error) => ({
    type: ADD_PRODUCT_FAILURE,
    error,
});

export const deleteProductRequest = () =>({
    type: DELETE_PRODUCT_REQUEST,
})
export const deleteProductSuccess = (id) =>({
    type: DELETE_PRODUCT_SUCCESS,
    payload: id,
})
export const deleteProductFailure = (error) =>({
    type: DELETE_PRODUCT_FAILURE,
    error,
})

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await axios.get(`${HOST}/api/products`);
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchProductsFailure(error));
        }
    };
};

export const addProduct = (productData) => {
    return async (dispatch) => {
        dispatch(addProductRequest());
        try {
            const response = await axios.post(`${HOST}/api/products`, productData);
            dispatch(addProductSuccess(response.data));
        } catch (error) {
            dispatch(addProductFailure(error));
        }
    };
};

export const deleteProduct = (productId) =>{
    return async(dispatch) => {
        dispatch(deleteProductRequest());
        try {
            await axios.delete(`${HOST}/api/products/${productId}`);
            dispatch(deleteProductSuccess(productId));
        } catch (error) {
            dispatch(deleteProductFailure(error));
        }

    };
    };
