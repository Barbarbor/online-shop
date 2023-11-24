import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { CategoryState } from "../../../types/Category";
import { ICategory } from "../../../../models/ICategory";

const initialState : CategoryState = {
    categories: [],
    isLoading: false,
    error: ''
}

export const categoryManagementSlice = createSlice({
    name: 'categoryManagement',
    initialState,
    reducers: {
        categoryAction(state) {
            state.isLoading = true;
            state.error = '';
        },
        categoryActionSuccess(state, action: PayloadAction<ICategory[]>) {
            state.isLoading = false;
            state.error = '';
            state.categories = action.payload;
        },
        addCategoryActionSuccess(state, action: PayloadAction<ICategory>) {
            state.isLoading = false;
            state.error = '';
            state.categories.push(action.payload);
        },
        deleteCategoriesSuccess(state, action: PayloadAction<number[]>) {
            state.isLoading = false;
            state.error = '';
            state.categories = state.categories.filter(category => !action.payload.includes(category.id));
        },
        categoryActionError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default categoryManagementSlice.reducer;