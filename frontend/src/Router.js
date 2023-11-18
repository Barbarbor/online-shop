import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import UserManagement from "./components/admin/UserManagement";
import CategoryManagement from "./components/admin/CategoryManagement";
import SubcategoryManagement from "./components/admin/SubcategoryManagement";
import ProductManagement from "./components/admin/ProductManagement";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Cart from './components/pages/Cart';
import Liked from "./components/pages/Liked";
import SearchResults from "./components/pages/SearchResults";
import SubcategoryProducts from "./components/pages/SubcategoryProducts";
import { useParams } from 'react-router-dom';
function AppRouter() {
    const { subcategoryId } = useParams();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path={"/admin/users"} element={<UserManagement/>} />
                <Route path={"/admin/categories"} element={<CategoryManagement/>} />
                <Route path={"/admin/subcategories"} element={<SubcategoryManagement/>} />
                <Route path={"/admin/products"} element={<ProductManagement/>} />
                <Route path={"/register"} element={<Registration/>} />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/cart"} element={<Cart/>} />
                <Route path={"/liked"} element={<Liked/>} />
                <Route path={"/search-results/:searchQuery"} element={<SearchResults/>} />
                <Route
                    path="/category/:subcategoryId"
                    element={<SubcategoryProducts  />}

                />
            </Routes>
        </Router>
    );
}                                                                   

export default AppRouter;