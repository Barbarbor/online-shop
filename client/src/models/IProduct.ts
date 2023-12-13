import { ICategory } from "./ICategory";
import { ISubcategory } from "./ISubcategory";

export interface IProduct {
    id: number,
    name: string,
    price: number,
    photography_url: string,
    category: ICategory,
    subcategory: ISubcategory ,
    CategoryId: number | null,
    SubcategoryId: number | null,
    description: string
}