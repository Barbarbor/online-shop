// categoryManagementReducer.js

import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
} from '../actions/categoryManagementActions';

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categoryManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case ADD_CATEGORY_REQUEST:
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

        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };

        case FETCH_CATEGORIES_FAILURE:
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default categoryManagementReducer;
