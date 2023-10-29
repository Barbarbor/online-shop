// cartReducer.js
import{
    FETCH_CARTITEMS_REQUEST,
    FETCH_CARTITEMS_SUCCESS,
    FETCH_CARTITEMS_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
} from "../actions";

const initialState = {
    items: [],
    products: [],
    total: 0,
    loading:false,
    error:null,
};
const calculateTotal = (products) => {
    return products.reduce((total, product) => total + product.price, 0);
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARTITEMS_REQUEST:
        case ADD_TO_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error:null,
            };
        case FETCH_CARTITEMS_SUCCESS:
            const fetchedCartItems = action.payload.cartitems;
            const fetchedProducts = action.payload.products;
            return {
                ...state,
                items: fetchedCartItems,
                products: fetchedProducts,
                total: calculateTotal(fetchedProducts),
                loading: false,
                error: null,
            };

        case ADD_TO_CART_SUCCESS:
            const newCartItem = action.payload.cartitem;
            const newProduct = action.payload.product;
            return{
                ...state,
                items: [state.items,newCartItem],
                total: state.total + newProduct.price,
                products: [...state.products, newProduct],
                loading:false,
                error:null,

            };
        case REMOVE_FROM_CART_SUCCESS:
            const updatedCartitems = state.items.filter((cartitem) => cartitem.id !== action.payload.cartitemId);
            const removedProduct = state.products.find(action.payload.productId);
            const updatedProducts = state.products.filter((product) => product.id !== removedProduct);
            return{
                ...state,
                items: updatedCartitems,
                products: updatedProducts,
                total: state.total - removedProduct.price,
                loading: false,
                error:null,
            };
        case FETCH_CARTITEMS_FAILURE:
        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:
            return{
                ...state,
                loading: false,
                error:action.error,
            };
        default:
            return state;
    }
};

export default cartReducer;
