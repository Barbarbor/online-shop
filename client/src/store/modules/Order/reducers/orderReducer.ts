import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../../../types/Order";
import { ICartItem } from "../../../../models/ICartItem";
import { IOrder } from "../../../../models/IOrder";
import { IOrderItem } from "../../../../models/IOrderItem";
import {IProduct} from "../../../../models/IProduct";

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
            const newOrder = {order: action.payload.order, orderItems: action.payload.orderItems,products:[]};
            state.orders.push(newOrder);
        },
        createOrderError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchOrdersRequest(state) {
            state.isLoading = true;
            state.error = '';
        },
        fetchOrdersSuccess(state,action:PayloadAction<{order:IOrder,orderItems:IOrderItem[],products:IProduct[]}[]>) {
            state.orders = action.payload;
            state.isLoading = false;
            state.error = ''
        },
        fetchOrdersError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },

});

export default orderSlice.reducer;