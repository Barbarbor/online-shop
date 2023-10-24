import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from "./productReducer"; // Import your category reducer
import mainPageReducer from "./mainPageReducer";
import categoryManagementReducer from "./categoryManagementReducer";
import subcategoryManagementReducer from "./subcategoryManagementReducer";
import productManagementReducer from "./productManagementReducer";
import cartReducer from "./cartReducer";
import cartItemReducer from "./cartItemReducer";
import likeReducer from "./likeReducer";
import likedReducer from "./likedReducer";
import searchReducer from "./searchReducer";
import userManagementReducer from "./userManagementReducer";
// Combine all your reducers here
const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    mainPage: mainPageReducer,

    categoryManagement:categoryManagementReducer,
    subcategoryManagement: subcategoryManagementReducer,
    productManagement: productManagementReducer,
    userManagement: userManagementReducer,

    cart: cartReducer,
    cartItem:cartItemReducer,

    likes: likeReducer,
    liked: likedReducer,

    search: searchReducer
});

export default rootReducer;