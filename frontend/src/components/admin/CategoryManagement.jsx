import React, { useEffect } from 'react';
import CategoryForm from '../forms/CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory } from '../../store/actions/categoryManagementActions';

const CategoryManagement = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoryManagement.categories);
    const loading = useSelector((state) => state.categoryManagement.loading);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (newCategory) => {
        dispatch(addCategory(newCategory));
    };

    return (
        <div className="category-management">
            <h1>Category Management</h1>
            <CategoryForm onSubmit={handleAddCategory} />
            <ul>
                {categories.map((category, index) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManagement;