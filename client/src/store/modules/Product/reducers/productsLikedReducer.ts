import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { ProductsState } from "../../../types/Product";
import { IProduct } from "../../../../models/IProduct";

const initialState : ProductsState = {
    products: [],
    isLoading: false,
    error: '',
}

export const productsLikedSlice = createSlice({
    name: 'productsLiked',
    initialState,
    reducers: {
        likedProductsFetching(state) {
            state.isLoading = true;
            state.error = '';
        },
        likedProductsFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false;
            state.error = '';
            state.products = action.payload;
        },
        likedProductsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export default productsLikedSlice.reducer;