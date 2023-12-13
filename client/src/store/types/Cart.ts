import { ICartItem } from "../../models/ICartItem";
import { IProduct } from "../../models/IProduct";

export interface ICart {
    cartitems: ICartItem[];
    products: IProduct[];
    total: number;
    isLoading: boolean;
    error: string | null;
}
export interface CartStateMultiple {
    users: Record<number, ICart>;
}