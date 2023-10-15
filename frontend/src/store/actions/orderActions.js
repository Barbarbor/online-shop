// orderActions.js
import axios from 'axios';
import { HOST } from '../../constants';

export const createOrder = (cartItems) => {
    return async (dispatch) => {
        try {
            // Create the order
            const orderResponse = await axios.post(`${HOST}/api/orders`, {
                order_date: new Date(),
                status: 'Paid',
                UserId: 1, // Replace with user authentication when available
            });

            // Create order items
            const orderItems = cartItems.map((item) => {
                return {
                    quantity: item.quantity, // Use the quantity from the cart item
                    subtotal: item.quantity * item.price, // Calculate subtotal
                    OrderId: orderResponse.data.id,
                    ProductId: item.ProductId,
                };
            });

            // Create the order items
            const orderItemsResponse = await axios.post(`${HOST}/api/order-items`, orderItems);

            // Dispatch actions
            dispatch({
                type: 'CREATE_ORDER',
                payload: { order: orderResponse.data, orderItems: orderItemsResponse.data },
            });
        } catch (error) {
            // Handle error
        }
    };
};
