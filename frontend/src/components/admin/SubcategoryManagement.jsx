// SubcategoryManagement.js

import React, { useEffect } from 'react';
import SubcategoryForm from '../forms/SubcategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategories, addSubcategory } from '../../store/actions/subcategoryManagementActions';
import { fetchCategories } from '../../store/actions/categoryManagementActions';

const SubcategoryManagement = () => {
    const dispatch = useDispatch();
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const loading = useSelector((state) => state.subcategoryManagement.loading);

    useEffect(() => {
        dispatch(fetchSubcategories());
        dispatch(fetchCategories()); // Fetch categories
    }, [dispatch]);

    const handleAddSubcategory = (newSubcategory) => {
        dispatch(addSubcategory(newSubcategory));
    };

    return (
        <div className="subcategory-management">
            <h1>Subcategory Management</h1>
            <SubcategoryForm onSubmit={handleAddSubcategory} categories={categories} />
            <ul>
                {subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                        {categories.find((category) => category.id === subcategory.CategoryId)?.name} - {subcategory.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubcategoryManagement;
