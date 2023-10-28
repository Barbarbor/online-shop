import
{
    UNLIKE_PRODUCT_REQUEST,
    UNLIKE_PRODUCT_SUCCESS,
    UNLIKE_PRODUCT_FAILURE,
    LIKE_PRODUCT_REQUEST,
    LIKE_PRODUCT_SUCCESS,
    LIKE_PRODUCT_FAILURE,
    FETCH_LIKED_PRODUCTS_REQUEST,
    FETCH_LIKED_PRODUCTS_SUCCESS,
    FETCH_LIKED_PRODUCTS_FAILURE, } from "../actions/likeActions";
const initialState = {
    products: [],
    loading:false,
    error:null// Store liked product IDs
};
const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_PRODUCT_REQUEST:
        case UNLIKE_PRODUCT_REQUEST:
        case FETCH_LIKED_PRODUCTS_REQUEST:
            return{
                ...state,
                loading: true,
                error:null
            }
        case LIKE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],

            };
        case UNLIKE_PRODUCT_SUCCESS:
            const updatedLikedProducts = state.products.filter(id => id !== action.payload);
            return {
                ...state,
                loading: false,
                products: updatedLikedProducts,
            };
        case FETCH_LIKED_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case LIKE_PRODUCT_FAILURE:
        case UNLIKE_PRODUCT_FAILURE:
        case FETCH_LIKED_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.error,
            }
        default:
            return state;
    }

};

export default likeReducer;