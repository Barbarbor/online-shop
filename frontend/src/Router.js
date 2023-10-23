import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProductDetailPage from './components/ProductDetailPage';
import UserManagement from "./components/admin/UserManagement";
import CategoryManagement from "./components/admin/CategoryManagement";
import SubcategoryManagement from "./components/admin/SubcategoryManagement";
import ProductManagement from "./components/admin/ProductManagement";
import FileUpload from "./components/FileUpload";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Cart from './components/Cart';
import Liked from "./components/Liked";
import SearchResults from "./components/SearchResults";
import SubcategoryProducts from "./components/SubcategoryProducts";
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
                <Route path={"/upload"} element={<FileUpload/>} />
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