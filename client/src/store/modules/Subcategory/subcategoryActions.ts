import axios from "axios";
import { ISubcategory} from "../../../models/ISubcategory";
import { AppDispatch } from "../../store";
import { subcategorySlice } from "./reducers/subcategoryReducer";
import { subcategoryManagementSlice } from "./reducers/subcategoryManagementReducer";
import { HOST } from "../../../constants";

export const fetchSubcategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategorySlice.actions.subcategoriesFetching())
        const response = await axios.get<ISubcategory[]>(`${HOST}/api/subcategories`);
        dispatch(subcategorySlice.actions.subcategoriesFetchingSuccess(response.data))
    }
    catch (e: any) {
        dispatch(subcategorySlice.actions.subcategoriesFetchingError(e.message))
    }
}

export const fetchManagementSubcategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategoryManagementSlice.actions.subcategoryAction())
        const response = await axios.get<ISubcategory[]>(`${HOST}/api/subcategories`);
        dispatch(subcategoryManagementSlice.actions.subcategoryActionSuccess(response.data))
    }
    catch (e: any) {
        dispatch(subcategoryManagementSlice.actions.subcategoryActionError(e.message))
    }
}

export const fetchSubcategoriesOfCategory = (categoryId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategoryManagementSlice.actions.subcategoryAction());
        const response = await axios.get<ISubcategory[]>(`${HOST}/api/categories/${categoryId}/subcategories`);
        dispatch(subcategoryManagementSlice.actions.subcategoryActionSuccess(response.data));
    } catch (e : any) {
        dispatch(subcategoryManagementSlice.actions.subcategoryActionError(e.message));
    }
}

export const addSubcategory = (newSubcategory: ISubcategory) => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategoryManagementSlice.actions.subcategoryAction());
        const response = await axios.post<ISubcategory>(`${HOST}/api/subcategories`, {
            name: newSubcategory.name,
            CategoryId: +newSubcategory.CategoryId,
        });

        dispatch(subcategoryManagementSlice.actions.addSubcategoryActionSuccess(response.data));
    } catch (e : any) {
        dispatch(subcategoryManagementSlice.actions.subcategoryActionError(e.message));
    }
}

export const deleteSubcategory = (subcategoryId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategoryManagementSlice.actions.subcategoryAction());
        const response = await axios.delete(`api/categories/${subcategoryId}`);
        dispatch(subcategoryManagementSlice.actions.subcategoryActionSuccess(response.data));
    } catch (e : any) {
        dispatch(subcategoryManagementSlice.actions.subcategoryActionError(e.message));
    }
}

export const deleteSubcategories = (subcategoryIds: number[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(subcategoryManagementSlice.actions.subcategoryAction());
        await axios.delete(`${HOST}/api/subcategories/multiple/delete-multiple`,{data:{subcategoryIds:subcategoryIds}});
        dispatch(subcategoryManagementSlice.actions.deleteSubcategoriesActionSuccess(subcategoryIds));
    } catch (e : any) {
        dispatch(subcategoryManagementSlice.actions.subcategoryActionError(e.message));
    }
}

