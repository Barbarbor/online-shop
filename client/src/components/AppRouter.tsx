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
import SubcategoryManagement from './admin/SubcategoryManagement';
import Login from "./auth/Login";
import Orders from './pages/Orders';
import AdminPage from "./pages/AdminPage"
import {useUser} from "../hooks/useUser";

const AppRouter = () => {
    const {currentUser} = useUser();

    return (
        <BrowserRouter>
            <NavPanel/>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/admin" element={currentUser?.id == 19? ( <AdminPage/>) : (<div/>)} />
                <Route path={"/admin/categories"} element={currentUser?.id == 19? (<CategoryManagement/>) :(<div/>)} />
                <Route path={"/admin/subcategories"} element={currentUser?.id == 19? (<SubcategoryManagement/> ) : ( <div/>)} />
                <Route path={"/admin/products"} element={currentUser?.id == 19? ( <ProductManagement/>) : (<div/>)} />

                <Route path={"/cart"} element={<Cart/>} />
                <Route path={"/liked"} element={<Liked/>} />
                <Route path={"/search-results/:searchQuery"} element={<SearchResults/>} />
                <Route
                    path="/category/:subcategoryId"
                    element={<SubcategoryProducts  />}
                />
                <Route
                    path={'/orders'}
                    element={<Orders/>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;