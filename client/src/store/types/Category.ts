import { ICategory } from "../../models/ICategory";

export interface CategoryState {
    categories: ICategory[];
    isLoading: boolean;
    error: null | string;
}