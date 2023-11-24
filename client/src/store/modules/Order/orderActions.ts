import axios from "axios";
import { HOST } from "../../../constants";
import { ICartItem } from "../../../models/ICartItem";
import { AppDispatch } from "../../store";
import { orderSlice } from "./reducers/orderReducer";
import { IOrder } from "../../../models/IOrder";
import { IOrderItem } from "../../../models/IOrderItem";

export const createOrder = (cartItems: ICartItem[], total: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(orderSlice.actions.createOrderRequest())
        // Create the order
        const orderResponse = await axios.post<IOrder>(`${HOST}/api/orders`, {
            order_date: 1,
            status: 'PAID',
            UserId: 1, // Replace with user authentication when available
            total:total,
        });

        // Create order items
        const orderItems = cartItems.map((item) => {
            return {
                quantity: item.quantity,
                OrderId: orderResponse.data.id,
                ProductId: item.ProductId
            }
        })

        const orderItemsResponse = await axios.post<IOrderItem[]>(`${HOST}/api/order-items`, orderItems);

        dispatch(orderSlice.actions.createOrderSuccess({order: orderResponse.data, orderItems: orderItemsResponse.data}))
    }
    catch (e: any) {
        dispatch(orderSlice.actions.createOrderRequest(e.message))
    }
}