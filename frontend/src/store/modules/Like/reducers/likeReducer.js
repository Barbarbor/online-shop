import
{
    UNLIKE_PRODUCT_REQUEST,
    UNLIKE_PRODUCT_SUCCESS,
    UNLIKE_PRODUCT_FAILURE,
    LIKE_PRODUCT_REQUEST,
    LIKE_PRODUCT_SUCCESS,
    LIKE_PRODUCT_FAILURE,
  } from "../actions";
const initialState = {
    loading:false,
    error:null// Store liked product IDs
};
const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_PRODUCT_REQUEST:
        case UNLIKE_PRODUCT_REQUEST:

            return{
                ...state,
                loading: true,
                error:null
            }
        case LIKE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case UNLIKE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case LIKE_PRODUCT_FAILURE:
        case UNLIKE_PRODUCT_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }

};

export default likeReducer;