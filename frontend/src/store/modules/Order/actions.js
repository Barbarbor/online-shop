// orderActions.js
import axios from 'axios';
import { HOST } from '../../../constants';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
});
export const createOrderSuccess = (order, orderitems) => ({
    type: CREATE_ORDER_SUCCESS,
    payload: {order:order,orderitems: orderitems },
});

export const createOrderFailure = (error) => ({
    type: CREATE_ORDER_FAILURE,
    error,
});

export const createOrder = (cartItems,total) => {
    return async (dispatch) => {
        dispatch(createOrderRequest());
        try {
            // Create the order
            const orderResponse = await axios.post(`${HOST}/api/orders`, {
                order_date: 1,
                status: 'PAID',
                UserId: 1, // Replace with user authentication when available
                total:total,
            });

            // Create order items
            const orderItems = cartItems.map((item) => {
                return {
                    quantity: item.quantity, // Use the quantity from the cart item
                    OrderId: orderResponse.data.id,
                    ProductId: item.ProductId,
                };
            });

            // Create the order items
            const orderItemsResponse = await axios.post(`${HOST}/api/order-items`, orderItems);

            // Dispatch actions
            dispatch(createOrderSuccess({order:orderResponse.data,orderitems:orderItemsResponse.data}));
        } catch (error) {
            dispatch(createOrderFailure(error));
        }
    };
};
