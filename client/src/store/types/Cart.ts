import { ICartItem } from "../../models/ICartItem";
import { IProduct } from "../../models/IProduct";

export interface CartState {
    items: ICartItem[],
    products: IProduct[],
    total: number,
    isLoading: boolean,
    error: string | null
}