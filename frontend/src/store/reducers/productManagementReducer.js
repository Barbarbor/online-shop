// productManagementReducer.js

import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
} from '../actions/productManagementActions';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
            };
        case FETCH_PRODUCTS_FAILURE:
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default productManagementReducer;
