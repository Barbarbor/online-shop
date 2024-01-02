import { ICartItem } from "../../models/ICartItem"
import { IOrder } from "../../models/IOrder";
import { IOrderItem } from "../../models/IOrderItem";
import {IProduct} from "../../models/IProduct";

export interface OrderState {
    orders: {orderItems: IOrderItem[]; order: IOrder, products: IProduct[]}[],
    isLoading: boolean,
    error: string | null,
}