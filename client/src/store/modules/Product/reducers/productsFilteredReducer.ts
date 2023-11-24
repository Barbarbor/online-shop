import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../../models/IProduct";
import { ProductSubcategoryState } from "../../../types/Product";

const initialState : ProductSubcategoryState = {
    category: null,
    subcategory: null,
    products: [],
    isLoading: false,
    error: null
}

export const productsFilteredSlice = createSlice({
    name: 'productsFiltered',
    initialState,
    reducers: {
        subcategoryProductsFetching(state) {
            state.isLoading = true;
            state.error = '';
        },
        subcategoryProductsFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false;
            state.error = '';
            state.category = action.payload[0].CategoryId;
            state.subcategory = action.payload[0].SubcategoryId;
            state.products = action.payload;
        },
        subcategoryProductsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export default productsFilteredSlice.reducer;