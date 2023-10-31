import{
    FETCH_SUBCATEGORIES_OF_CATEGORY_REQUEST,
    FETCH_SUBCATEGORIES_OF_CATEGORY_SUCCESS,
    FETCH_SUBCATEGORIES_OF_CATEGORY_FAILURE,
} from "../actions";

const initialState = {
    subcategories: [],
    loading: false,
    error: null,
};


const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBCATEGORIES_OF_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_SUBCATEGORIES_OF_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                subcategories: action.payload,
            };

        case FETCH_SUBCATEGORIES_OF_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default subcategoryReducer;