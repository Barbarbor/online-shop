import {
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
} from '../actions';
const initialState ={
    products:[],
    loading:false,
    error:null,
};
const productsGlobalReducer = (state=initialState,action) =>{
    switch(action.type){
        case FETCH_ALL_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return{
                ...state,
                products:action.payload,
                loading: false,
            };
        case FETCH_ALL_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: false,
                error:action.error
            };
        default:
            return state;
    }
};
export default productsGlobalReducer;