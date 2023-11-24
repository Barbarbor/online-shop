import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { SubcategoryState } from "../../../types/Subcategory";
import { ISubcategory } from "../../../../models/ISubcategory";

const initialState : SubcategoryState = {
    subcategories: [],
    isLoading: false,
    isError: null
}

export const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {
        subcategoriesFetching(state) {
            state.isLoading = true;
        },
        subcategoriesFetchingSuccess(state, action: PayloadAction<ISubcategory[]>) {
            state.isLoading = false;
            state.isError = '';
            state.subcategories = action.payload;
        },
        subcategoriesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.isError = action.payload;
        }
    },
})

export default subcategorySlice.reducer;