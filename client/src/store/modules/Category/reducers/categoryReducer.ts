import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { CategoryState } from "../../../types/Category";
import { ICategory } from "../../../../models/ICategory";

const initialState : CategoryState = {
    categories: [],
    isLoading: false,
    error: ''
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categoriesFetching(state) {
            state.isLoading = true;
        },
        categoriesFetchingSuccess(state, action: PayloadAction<ICategory[]>) {
            state.isLoading = false;
            state.error = '';
            state.categories = action.payload;
        },
        categoriesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export default categorySlice.reducer;