import { ICartItem } from "../../models/ICartItem"
import { IOrder } from "../../models/IOrder";
import { IOrderItem } from "../../models/IOrderItem";

export interface OrderState {
    orders: {orderItems: IOrderItem[]; order: IOrder; total: number}[],
    isLoading: boolean,
    error: string | null,
}