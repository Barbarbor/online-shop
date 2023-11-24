import { ICartItem } from "./ICartItem";
import { IProduct } from "./IProduct";

export interface ICart {
    cartitems: ICartItem[],
    products: IProduct[],
    total: number,
    isLoading: false;
    error: null;
}