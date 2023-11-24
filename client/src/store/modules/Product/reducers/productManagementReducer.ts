import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { ProductsState } from "../../../types/Product";
import { IProduct } from "../../../../models/IProduct";

const initialState : ProductsState = {
    products: [],
    isLoading: false,
    error: '',
}

export const productManagementSlice = createSlice({
    name: "productManagement",
    initialState,
    reducers: {
        fetchAllProductsRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchAllProductsSuccess(state, action: PayloadAction<IProduct[]>) {
            state.isLoading = false;
            state.products = action.payload;
        },
        addProductRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        addProductSuccess(state, action: PayloadAction<IProduct>) {
            state.isLoading = false;
            state.products.push(action.payload);
        },
        deleteProductRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteProductSuccess(state, action: PayloadAction<number>) {
            state.isLoading = false;
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        fetchAllProductsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        addProductFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteProductFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteProductsRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        deleteProductsSuccess(state, action: PayloadAction<number[]>) {
            state.isLoading = false;
            state.products = state.products.filter((product) => !action.payload.includes(product.id));
        },
        deleteProductsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default productManagementSlice.reducer;