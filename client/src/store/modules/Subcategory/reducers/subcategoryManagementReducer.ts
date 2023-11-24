import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { ICategory } from "../../../../models/ICategory";
import { SubcategoryState } from "../../../types/Subcategory";
import { ISubcategory } from "../../../../models/ISubcategory";

const initialState : SubcategoryState = {
    subcategories: [],
    isLoading: false,
    isError: null
}

export const subcategoryManagementSlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {
        subcategoryAction(state) {
            state.isLoading = true;
            state.isError = '';
        },
        subcategoryActionSuccess(state, action: PayloadAction<ISubcategory[]>) {
            state.isLoading = false;
            state.isError = '';
            state.subcategories = action.payload;
        },
        addSubcategoryActionSuccess(state, action: PayloadAction<ISubcategory>) {
            state.isLoading = false;
            state.isError = '';
            state.subcategories.push(action.payload);
        },
        deleteSubcategoriesActionSuccess(state, action: PayloadAction<number[]>) {
            state.isLoading = false;
            state.isError = '';
            state.subcategories.filter(subcategory => !action.payload.includes(subcategory.id));
        },
        subcategoryActionError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.isError = action.payload;
        },
    },
});

export default subcategoryManagementSlice.reducer;