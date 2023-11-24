import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../../../types/Order";
import { ICartItem } from "../../../../models/ICartItem";
import { IOrder } from "../../../../models/IOrder";
import { IOrderItem } from "../../../../models/IOrderItem";

const initialState : OrderState = {
    orders: [],
    isLoading: false,
    error: ''
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrderRequest(state) {
            state.isLoading = true;
            state.error = '';
        },
        createOrderSuccess(state, action: PayloadAction<{order:IOrder, orderItems: IOrderItem[]}>) {
            state.isLoading = false;
            state.error = '';
            state.orders.push({ order: action.payload.order, orderItems: action.payload.orderItems, total: action.payload.order.total });
        },
        createOrderError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default orderSlice.reducer;