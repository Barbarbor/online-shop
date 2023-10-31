import{
    FETCH_SUBCATEGORY_PRODUCTS_REQUEST,
    FETCH_SUBCATEGORY_PRODUCTS_SUCCESS,
    FETCH_SUBCATEGORY_PRODUCTS_FAILURE,
} from "../actions";
const initialState ={
    category:null,
    subcategory:null,
    filteredProducts:[],
    loading:false,
    error:null
};
const productsFilteredReducer = (state=initialState,action) =>{
    switch (action.type){
        case FETCH_SUBCATEGORY_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            };
        case FETCH_SUBCATEGORY_PRODUCTS_SUCCESS:
            return{
                ...state,
                category: action.payload[0].CategoryId,
                subcategory: action.payload[0].SubcategoryId,
                filteredProducts: action.payload,
                loading: false,
            };
        case FETCH_SUBCATEGORY_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: false,
                error:action.error,
            };
        default:
            return state;
    }
};
export default productsFilteredReducer;