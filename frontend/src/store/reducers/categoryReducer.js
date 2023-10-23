import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    FETCH_SUBCATEGORIES_FAILURE,
    FETCH_SUBCATEGORY_PRODUCTS_REQUEST,
    FETCH_SUBCATEGORY_PRODUCTS_SUCCESS,
    FETCH_SUBCATEGORY_PRODUCTS_FAILURE,
} from '../actions/categoryActions';

const initialState = {
    categories: [],
    subcategories: [],
    products:[],
    loading: false,
    error: null,

};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };

        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case FETCH_SUBCATEGORIES_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case FETCH_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                subcategories: action.payload,
            };

        case FETCH_SUBCATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case FETCH_SUBCATEGORY_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_SUBCATEGORY_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };

        case FETCH_SUBCATEGORY_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default categoryReducer;