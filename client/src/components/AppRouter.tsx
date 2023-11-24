import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NavPanel from './common/NavPanel';
import Liked from './pages/Liked';
import Cart from './pages/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchResults from './pages/SearchResults';
import SubcategoryProducts from './pages/SubcategoryProducts';
import CategoryManagement from './admin/CategoryManagement';
import ProductManagement from './admin/ProductManagement';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavPanel/>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                {/* <Route path={"/admin/users"} element={<UserManagement/>} /> */}
                <Route path={"/admin/categories"} element={<CategoryManagement/>} />
                {/* <Route path={"/admin/subcategories"} element={<SubcategoryManagement/>} /> */}
                <Route path={"/admin/products"} element={<ProductManagement/>} />
                {/* <Route path={"/register"} element={<Registration/>} /> */}
                {/* <Route path={"/login"} element={<Login/>} /> */}
                <Route path={"/cart"} element={<Cart/>} />
                <Route path={"/liked"} element={<Liked/>} />
                <Route path={"/search-results/:searchQuery"} element={<SearchResults/>} />
                <Route
                    path="/category/:subcategoryId"
                    element={<SubcategoryProducts  />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;