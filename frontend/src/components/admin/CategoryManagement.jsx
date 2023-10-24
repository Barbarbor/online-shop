
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../forms/CategoryForm';
import { fetchCategories, addCategory, deleteCategory } from '../../store/actions/categoryManagementActions';
import { Button, ListGroup } from 'react-bootstrap';

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

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };

    return (
        <div className="category-management">
            <h1>Category Management</h1>
            <CategoryForm onSubmit={handleAddCategory} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ListGroup>
                    {categories.map((category) => (
                        <ListGroup.Item key={category.id}>
                            {category.name}
                            <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default CategoryManagement;