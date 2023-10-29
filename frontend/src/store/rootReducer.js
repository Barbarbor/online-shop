import { combineReducers } from 'redux';

import categoryReducer from './modules/Category/reducers/categoryReducer';
import categoryManagementReducer from "./modules/Category/reducers/categoryManagementReducer";

import subcategoryReducer from "./modules/Subcategory/reducers/subcategoryReducer";
import subcategoryManagementReducer from "./modules/Subcategory/reducers/subcategoryManagementReducer";


import productsGlobalReducer from "./modules/Product/reducers/productsGlobalReducer";
import productsLikedReducer from "./modules/Product/reducers/productsLikedReducer";
import productsFilteredReducer from "./modules/Product/reducers/productsFilteredReducer";
import productsSearchedReducer from "./modules/Product/reducers/productsSearchedReducer";
import productManagementReducer from "./modules/Product/reducers/productManagementReducer";
import productReducer from "./modules/Product/reducers/productReducer";

import cartReducer from "./modules/Cart/reducers/cartReducer";


import likeReducer from "./modules/Like/reducers/likeReducer";


import userManagementReducer from "./modules/User/reducers/userManagementReducer";


// Combine all your reducers here
const rootReducer = combineReducers({
    category:categoryReducer,
    categoryManagement:categoryManagementReducer,

    subcategory:subcategoryReducer,
    subcategoryManagement: subcategoryManagementReducer,

    products: productsGlobalReducer,
    likedProducts: productsLikedReducer,
    filteredProducts: productsFilteredReducer,
    searchedProducts: productsSearchedReducer,
    productManagement: productManagementReducer,
    product: productReducer,

    userManagement: userManagementReducer,

    cart: cartReducer,

    likes: likeReducer,
});

export default rootReducer;