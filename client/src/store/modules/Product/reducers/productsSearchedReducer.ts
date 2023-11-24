import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { ProductsState } from "../../../types/Product";
import { IProduct } from "../../../../models/IProduct";

const initialState : ProductsState = {
    products: [],
    isLoading: false,
    error: ''
}

export const productsSearchedSlice = createSlice({
    name: 'productsSearched',
    initialState,
    reducers: {
        searchedProductsFetching(state) {
            state.isLoading = true;
            state.error = '';
        },
        searchedProductsFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false;
            state.error = '';
            state.products = action.payload;
        },
        searchedProductsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export default productsSearchedSlice.reducer;