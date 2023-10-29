import {
    FETCH_SEARCHED_PRODUCTS_REQUEST,
    FETCH_SEARCHED_PRODUCTS_SUCCESS,
    FETCH_SEARCHED_PRODUCTS_FAILURE,
} from "../actions";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productsSearchedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEARCHED_PRODUCTS_REQUEST:
            return {
                ...state,
                loading:true,
                error:null,
            };
        case FETCH_SEARCHED_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error:null,
            };
        case FETCH_SEARCHED_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: false,
                error:action.error,
            };
        default:
            return state;
    }
};

export default productsSearchedReducer;