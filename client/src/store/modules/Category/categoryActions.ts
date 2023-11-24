import axios from "axios";
import { ICategory } from "../../../models/ICategory";
import { AppDispatch } from "../../store";
import { categoryManagementSlice } from "./reducers/categoryManagementReducer";
import { categorySlice } from "./reducers/categoryReducer";
import { ICartItem } from "../../../models/ICartItem";
import { HOST } from "../../../constants";


export const fetchCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.categoriesFetching())
        const response = await axios.get<ICategory[]>(`${HOST}/api/categories`);
        dispatch(categorySlice.actions.categoriesFetchingSuccess(response.data))
    }
    catch (e: any) {
        dispatch(categorySlice.actions.categoriesFetchingError(e.message))
    }
}

export const fetchManagementCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(categoryManagementSlice.actions.categoryAction())
        const response = await axios.get<ICategory[]>(`${HOST}/api/categories`);
        dispatch(categoryManagementSlice.actions.categoryActionSuccess(response.data))
    }
    catch (e: any) {
        dispatch(categoryManagementSlice.actions.categoryActionSuccess(e.message))
    }
}

export const addCategory = (newCategory: ICategory) => async (dispatch: AppDispatch) => {
    try {
        dispatch(categoryManagementSlice.actions.categoryAction());
        const response = await axios.post<ICategory>(`${HOST}/api/categories`, newCategory);
        dispatch(categoryManagementSlice.actions.addCategoryActionSuccess(response.data));
    } catch (e : any) {
        dispatch(categoryManagementSlice.actions.categoryActionError(e.message));
    }
}

export const deleteCategory = (categoryId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(categoryManagementSlice.actions.categoryAction());
        const response = await axios.delete(`${HOST}/api/categories/${categoryId}`);
        dispatch(categoryManagementSlice.actions.categoryActionSuccess(response.data));
    } catch (e : any) {
        dispatch(categoryManagementSlice.actions.categoryActionError(e.message));
    }
}

export const deleteCategories = (categoryIds: number[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(categoryManagementSlice.actions.categoryAction());
        await axios.delete(`${HOST}/api/categories/multiple/delete-multiple`, {data:{categoryIds:categoryIds}}) ;
        dispatch(categoryManagementSlice.actions.deleteCategoriesSuccess(categoryIds));
    } catch (e : any) {
        dispatch(categoryManagementSlice.actions.categoryActionError(e.message));
    }
}

