import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,


} from '../actions';

const initialState = {
    categories: [],

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


        default:
            return state;
    }
};

export default categoryReducer;