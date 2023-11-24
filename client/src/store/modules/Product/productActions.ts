import { IProduct } from '../../../models/IProduct';
import { AppDispatch } from '../../store';
import axios from 'axios';
import { productSlice } from './reducers/productReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOST } from '../../../constants';
import { productsGlobalSlice } from './reducers/productsGlobalReducer';
import { productsLikedSlice } from './reducers/productsLikedReducer';
import { productsSearchedSlice } from './reducers/productsSearchedReducer';
import { productManagementSlice } from './reducers/productManagementReducer';
import { ICategory } from '../../../models/ICategory';
import { ISubcategory } from '../../../models/ISubcategory';

export const fetchAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsGlobalSlice.actions.fetchAllProductsRequest())
        const response = await axios.get<IProduct[]>(`${HOST}/api/products`);
        dispatch(productsGlobalSlice.actions.fetchAllProductsSuccess(response.data))
    }
    catch (e: any) {
        dispatch(productsGlobalSlice.actions.fetchAllProductsFailure(e.message))
    }
}

export const fetchAllMangementProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productManagementSlice.actions.fetchAllProductsRequest())
        const response = await axios.get<IProduct[]>(`${HOST}/api/products`);
        dispatch(productManagementSlice.actions.fetchAllProductsSuccess(response.data))
    }
    catch (e: any) {
        dispatch(productManagementSlice.actions.fetchAllProductsFailure(e.message))
    }
}

export const fetchLimitedProducts = (page = 1, limit = 10) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsGlobalSlice.actions.fetchAllProductsRequest());
        const response = await axios.get<IProduct[]>(`${HOST}/api/products`, {
            params : {_page: page, _limit: limit}
        })
        const totalProductsCount = await axios.get<number>(`${HOST}/api/products/count`);
        dispatch(productsGlobalSlice.actions.fetchLimitedPrdouctsSuccess({
            limitedProducts: response.data,
            totalCount: totalProductsCount.data,
        }));
    } catch (error: any) {
        dispatch(productsGlobalSlice.actions.fetchAllProductsFailure(error));
    }
}

export const setProductsCurrentPage = (page: number) => {
    return productsGlobalSlice.actions.setProductsPage(page);
}

export const fetchProductById = (productId : number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productFetching());
        const response = await axios.get<{ product: IProduct; category: ICategory; subcategory: ISubcategory }>(`${HOST}/api/products/${productId}`);
        const { product, category, subcategory } = response.data;

        dispatch(productSlice.actions.productFetchingSuccess({product, category, subcategory}));
    } catch (error: any) {
        dispatch(productSlice.actions.productFetchingError(error));
    }
}

export const fetchSubcategoryProducts = (subcategoryId : number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productsGlobalSlice.actions.fetchAllProductsRequest());
        const response = await axios.get<IProduct[]>(`${HOST}/api/products/subcategory/${subcategoryId}`);
        dispatch(productsGlobalSlice.actions.fetchAllProductsSuccess(response.data));
    } catch (e: any) {
        dispatch(productsGlobalSlice.actions.fetchAllProductsFailure(e.message));
    }
}

export const fetchLikedProducts = (userId : number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productsLikedSlice.actions.likedProductsFetching());
        const response = await axios.get<IProduct[]>(`${HOST}/api/likes?UserId=${userId}`);
        dispatch(productsLikedSlice.actions.likedProductsFetchingSuccess(response.data));
    } catch (e: any) {
        dispatch(productsLikedSlice.actions.likedProductsFetchingError(e.message));
    }
}

// Отладить!
export const fetchSearchedProducts = (searchQuery : string) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productsSearchedSlice.actions.searchedProductsFetching());
        const response = await axios.get<IProduct[]>(`${HOST}/api/product/search?searchQuery=${searchQuery}`);
        dispatch(productsSearchedSlice.actions.searchedProductsFetchingSuccess(response.data));
    } catch (e: any) {
        dispatch(productsSearchedSlice.actions.searchedProductsFetchingError(e.message));
    }
}

export const addProduct = (productData : IProduct) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productManagementSlice.actions.addProductRequest());
        const response = await axios.post<IProduct>(`${HOST}/api/products`, {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            photography_url: productData.photography_url.name,
            CategoryId: productData.CategoryId,
            SubcategoryId: productData.SubcategoryId,
          }
        );
        dispatch(productManagementSlice.actions.addProductSuccess(response.data));
    } catch (e: any) {
        dispatch(productManagementSlice.actions.addProductFailure(e.message));
    }
}

export const deleteProduct = (productId : number) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productManagementSlice.actions.deleteProductRequest());
        const response = await axios.delete(`${HOST}/api/products/${productId}`);
        dispatch(productManagementSlice.actions.deleteProductRequest(response.data));
    } catch (e: any) {
        dispatch(productManagementSlice.actions.deleteProductFailure(e.message));
    }
}

export const deleteProducts = (productIds : number[]) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(productManagementSlice.actions.deleteProductsRequest());
        await axios.delete(`${HOST}/api/products/multiple/delete-multiple`,{data:{productIds: productIds}});
        dispatch(productManagementSlice.actions.deleteProductsSuccess(productIds));
    } catch (e: any) {
        dispatch(productManagementSlice.actions.deleteProductsFailure(e.message));
    }
}



// export const fetchAllProductsRequest = createAsyncThunk(
//     'product/fetchAll',
//     async(_,thunkAPI) => {
//         try {
//             const response = await axios.get<IProduct[]>('./products.json');
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Не удалось загрузить продукты")
//         }
//     }
// )