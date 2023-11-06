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
    UPDATE_CARTITEM_QUANTITY_REQUEST,
    UPDATE_CARTITEM_QUANTITY_SUCCESS,
    UPDATE_CARTITEM_QUANTITY_FAILURE,
} from "../actions";

const initialState = {
    items: [],
    products: [],
    total: 0,
    loading:false,
    error:null,
};
const calculateTotal = (cartItems, products) => {
    return cartItems.reduce((total, cartItem) => {
        const product = products.find(p => p.id === cartItem.ProductId);
        if (product) {
            // Multiply the product's price by the cart item's quantity
            total += product.price * cartItem.quantity;
        }
        return total;
    }, 0);
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARTITEMS_REQUEST:
        case ADD_TO_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
        case UPDATE_CARTITEM_QUANTITY_REQUEST:
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
                total: calculateTotal(fetchedCartItems,fetchedProducts),
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
                total: calculateTotal(updatedCartitems,updatedProducts),
                loading: false,
                error:null,
            };
        case UPDATE_CARTITEM_QUANTITY_SUCCESS:
            const updatedCartItem = action.payload;
            const updatedItemIndex = state.items.findIndex(
                (item) => item.id === updatedCartItem.id
            );
            const updatedItems = [...state.items];
            updatedItems[updatedItemIndex] = updatedCartItem;
            const updatedTotal = calculateTotal(updatedItems, state.products);
            return{
                ...state,
                items: updatedItems,
                total:updatedTotal,
                loading:false,
                error:null,
            };
        case FETCH_CARTITEMS_FAILURE:
        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:
        case UPDATE_CARTITEM_QUANTITY_FAILURE:
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
