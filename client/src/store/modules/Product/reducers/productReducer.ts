import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../../types/Product";
import { IProduct } from "../../../../models/IProduct";
import { ICategory } from "../../../../models/ICategory";
import { ISubcategory } from "../../../../models/ISubcategory";

const initialState : ProductState = {
    product: {} as IProduct,
    isLoading: false,
    error: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetching(state) {
            state.isLoading = true;
            state.error = '';
        },
        productFetchingSuccess(state, action: PayloadAction<{product: IProduct, category: ICategory, subcategory: ISubcategory}>) {
            state.isLoading = false;
            state.error = '';
            state.product = action.payload.product;
            state.product.category = action.payload.category;
            state.product.subcategory = action.payload.subcategory;
        },
        productFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
})

export default productSlice.reducer;
