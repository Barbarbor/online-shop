// cartActions.js
import axios from 'axios';
import { HOST } from '../../constants';
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const REMOVE_FROM_CART_REQUEST = 'REMOVE_FROM_CART_REQUEST';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';

export const FETCH_CARTITEMS_REQUEST = 'FETCH_CARTITEM_REQUEST';
export const FETCH_CARTITEMS_SUCCESS = 'FETCH_CARTITEM_SUCCESS';
export const FETCH_CARTITEMS_FAILURE = 'FETCH_CARTITEM_FAILURE';

export const FETCH_PRODUCTS_BY_IDS_REQUEST = 'FETCH_PRODUCTS_BY_IDS_REQUEST';
export const FETCH_PRODUCTS_BY_IDS_SUCCESS = 'FETCH_PRODUCTS_BY_IDS_SUCCESS';
export const FETCH_PRODUCTS_BY_IDS_FAILURE = 'FETCH_PRODUCTS_BY_IDS_FAILURE';

export const addToCartRequest = () => ({
    type:ADD_TO_CART_REQUEST,
});
export const addToCartSuccess = (product,cartitem) => ({
    type:ADD_TO_CART_SUCCESS,
    payload:{product:product,cartitem:cartitem},
});
export const addToCartFailure = (error) => ({
    type:ADD_TO_CART_SUCCESS,
    error,
});


export const removeFromCartRequest = () => ({
    type:REMOVE_FROM_CART_REQUEST,
});
export const removeFromCartSuccess = (cartitemId, productId) => ({
    type:REMOVE_FROM_CART_REQUEST,
    payload: {cartitemId:cartitemId,productId:productId},
});
export const removeFromCartFailure = (error) => ({
    type:REMOVE_FROM_CART_FAILURE,
    error,
});


export const fetchCartItemsRequest = () => ({
    type: FETCH_CARTITEMS_REQUEST,
});
export const fetchCartItemsSuccess = (products,cartitems) => ({
    type: FETCH_CARTITEMS_SUCCESS,
    payload:{products:products,cartitems:cartitems},
});
export const fetchCartItemsFailure = (error) => ({
    type: FETCH_CARTITEMS_FAILURE,
    error,
});



export const addToCart = (product) => {
    return async (dispatch) => {
        dispatch(addToCartRequest());
        try {
            const response = await axios.post(`${HOST}/api/cartitems`, {
                quantity: 1,
                UserId: 1, // Replace with user authentication when available
                ProductId: product.id,
            });
            const cartitem = response.data;
            dispatch(addToCartSuccess(product,cartitem));
        } catch (error) {
            dispatch(addToCartFailure(error));
        }
    };
};
export const removeFromCart = (cartitem) => {
    return async(dispatch) => {
        dispatch(removeFromCartRequest());
        try {
            const cartitemId = cartitem.id;
            const productId = cartitem.ProductId;
            await axios.delete(`${HOST}/api/cartitems/${cartitemId}`);
            dispatch(removeFromCartSuccess(cartitemId,productId));
        } catch(error){
            dispatch(removeFromCartFailure(error));
        }
    };
};

export const fetchCartItems = () => {
    return async (dispatch) => {
        dispatch(fetchCartItemsRequest());
        try {
            const response = await axios.get(`${HOST}/api/cartitems`);
            const products = response.data.products;
            const cartitems = response.data.cartitems;
            dispatch(fetchCartItemsSuccess(products,cartitems));
        } catch (error) {
            dispatch(fetchCartItemsFailure(error));
        }
    };
};

