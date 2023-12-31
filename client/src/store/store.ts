import { configureStore, combineReducers} from '@reduxjs/toolkit';


import { authReducer } from './modules/User/reducers/userManagementReducer';
import productReducer from './modules/Product/reducers/productReducer';
import categoryReducer from './modules/Category/reducers/categoryReducer';
import subcategoryReducer from './modules/Subcategory/reducers/subcategoryReducer';
import categoryManagementReducer from './modules/Category/reducers/categoryManagementReducer';
import subcategoryManagementReducer from './modules/Subcategory/reducers/subcategoryManagementReducer';
import likeReducer from './modules/Like/reducers/likeReducer';
import cartReducer from './modules/Cart/reducers/cartReducer';
import productsGlobalReducer from './modules/Product/reducers/productsGlobalReducer';
import productsLikedReducer from './modules/Product/reducers/productsLikedReducer';
import productsFilteredReducer from './modules/Product/reducers/productsFilteredReducer';
import productManagementReducer from './modules/Product/reducers/productManagementReducer';
import productsSearchedReducer from './modules/Product/reducers/productsSearchedReducer';
import orderReducer from "./modules/Order/reducers/orderReducer";

export const rootReducer = combineReducers({
    categoryReducer,
    categoryManagementReducer,

    subcategoryReducer,
    subcategoryManagementReducer,
    
    productReducer,
    productsGlobalReducer,
    productsLikedReducer,
    productsFilteredReducer,
    productManagementReducer,
    productsSearchedReducer,

    authReducer,
    
    likeReducer,
    
    cartReducer,

    orderReducer,
})

export const store = configureStore({
    reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
