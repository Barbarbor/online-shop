// ProductManagement.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../forms/ProductForm';
import { fetchProducts, addProduct } from '../../store/actions/productManagementActions';
import {fetchCategories,} from "../../store/actions/categoryManagementActions";
import {fetchSubcategories} from "../../store/actions/subcategoryManagementActions";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productManagement.products);
    const loading = useSelector((state) => state.productManagement.loading);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories()); // Fetch categories
        dispatch(fetchSubcategories()); // Fetch subcategories
    }, [dispatch]);

    const handleAddProduct = (newProduct) => {
        dispatch(addProduct(newProduct));
    };

    return (
        <div className="product-management">
            <h1>Product Management</h1>
            <ProductForm onSubmit={handleAddProduct} categories={categories} subcategories={subcategories} />
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
