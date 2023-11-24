import { ISubcategory } from '../../models/ISubcategory';

export interface SubcategoryState {
    subcategories: ISubcategory[];
    isLoading: boolean;
    isError: null | string;
}