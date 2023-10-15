// subcategoryManagementReducer.js

import {
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    FETCH_SUBCATEGORIES_FAILURE,
    ADD_SUBCATEGORY_REQUEST,
    ADD_SUBCATEGORY_SUCCESS,
    ADD_SUBCATEGORY_FAILURE,
} from '../actions/subcategoryManagementActions';

const initialState = {
    subcategories: [],
    loading: false,
    error: null,
};

const subcategoryManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBCATEGORIES_REQUEST:
        case ADD_SUBCATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                subcategories: action.payload,
            };

        case ADD_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                subcategories: [...state.subcategories, action.payload],
            };

        case FETCH_SUBCATEGORIES_FAILURE:
        case ADD_SUBCATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default subcategoryManagementReducer;