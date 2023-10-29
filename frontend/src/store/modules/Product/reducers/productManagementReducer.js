// productManagementReducer.js

import {
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../actions';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS_REQUEST:
        case ADD_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_PRODUCTS_SUCCESS:
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
        case DELETE_PRODUCT_SUCCESS:
            const updatedProducts = state.products.filter((product) => product.id !== action.payload);
            return {
                ...state,
                loading: false,
                products: updatedProducts,
            }
        case FETCH_ALL_PRODUCTS_FAILURE:
        case ADD_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
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
