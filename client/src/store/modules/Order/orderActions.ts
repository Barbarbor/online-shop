import axios from "axios";
import { HOST } from "../../../constants";
import { ICartItem } from "../../../models/ICartItem";
import { AppDispatch } from "../../store";
import { orderSlice } from "./reducers/orderReducer";
import { IOrder } from "../../../models/IOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import {OrderState} from "../../types/Order";
import {IProduct} from "../../../models/IProduct";

export const createOrder = (cartItems: ICartItem[], total: number, userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(orderSlice.actions.createOrderRequest());
        // Create the order
        const orderResponse = await axios.post<IOrder>(`${HOST}/api/orders`, {
            order_date: Date.now(),
            status: 'PAID',
            UserId: userId, // Replace with user authentication when available
            total:total,
        });

        // Create order items
        const orderItems = cartItems.map((item) => {
            return {
                quantity: item.quantity,
                OrderId: orderResponse.data.id,
                ProductId: item.ProductId
            }
        });

        const orderItemsResponse = await axios.post<IOrderItem[]>(`${HOST}/api/order-items`, orderItems);

        dispatch(orderSlice.actions.createOrderSuccess({order: orderResponse.data, orderItems: orderItemsResponse.data}));
    }
    catch (e: any) {
        dispatch(orderSlice.actions.createOrderError(e.message));
    }
}
export const fetchOrders = (userId:number) => async(dispatch:AppDispatch) => {
    try{
        dispatch(orderSlice.actions.fetchOrdersRequest());
        const response = await axios.get<IOrder[]>(`${HOST}/api/orders/${userId}`);

        const responseOrders = response.data;

        const orderPromises =  responseOrders.map( async(order) => {
            const orderId = order.id;
            const orderItemsResponse = await axios.get<{orderItems:IOrderItem[],products:IProduct[]}>(`${HOST}/api/order-items/${orderId}`);

            const orderItems = orderItemsResponse.data.orderItems;
            const products = orderItemsResponse.data.products;
            return {order,orderItems,products };

        });

        const orders = await Promise.all(orderPromises);
        dispatch(orderSlice.actions.fetchOrdersSuccess(orders));


    } catch(e:any) {
        dispatch(orderSlice.actions.fetchOrdersError(e.message));
    }

}