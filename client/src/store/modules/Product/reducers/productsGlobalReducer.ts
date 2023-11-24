import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../../models/IProduct";
import { ProductsGlobalState } from "../../../types/Product";

const initialState : ProductsGlobalState ={
    products:[],
    isLoading:false,
    error:null,
    page: 1,
    limit: 10,
    totalCount: 0
};

export const productsGlobalSlice = createSlice({
    name: "productsGlobal",
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
        fetchLimitedPrdouctsSuccess(state, action: PayloadAction<{limitedProducts: IProduct[], totalCount: number}>) {
            state.isLoading = false;
            state.products = action.payload.limitedProducts;
            state.totalCount = action.payload.totalCount;
        },
        setProductsPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        fetchAllProductsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
  
export default productsGlobalSlice.reducer;
