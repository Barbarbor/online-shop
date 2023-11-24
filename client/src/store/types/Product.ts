import { ICategory } from "../../models/ICategory";
import { IProduct } from "../../models/IProduct";
import { ISubcategory } from "../../models/ISubcategory";

export interface ProductState {
    product: IProduct;
    isLoading: boolean;
    error: null | string;
}


export interface ProductsState {
    products: IProduct[];
    isLoading: boolean;
    error: null | string;
}

export interface ProductsGlobalState {
    products: IProduct[];
    isLoading: boolean;
    error: null | string;
    page: number;
    limit: number;
    totalCount: number;
}

export interface ProductSubcategoryState {
    category: number | null,
    subcategory: number | null,
    products: IProduct[],
    isLoading: boolean;
    error: null | string;
}
