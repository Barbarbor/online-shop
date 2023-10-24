import React, { useEffect } from 'react';
import SubcategoryForm from '../forms/SubcategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSubcategories,
    addSubcategory,
    deleteSubcategory
} from '../../store/actions/subcategoryManagementActions';
import { fetchCategories } from '../../store/actions/categoryManagementActions';
import { Button, ListGroup } from 'react-bootstrap';

const SubcategoryManagement = () => {
    const dispatch = useDispatch();
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const loading = useSelector((state) => state.subcategoryManagement.loading);

    useEffect(() => {
        dispatch(fetchSubcategories());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddSubcategory = (newSubcategory) => {
        dispatch(addSubcategory(newSubcategory));
    };

    const handleDeleteSubcategory = (subcategoryId) => {
        dispatch(deleteSubcategory(subcategoryId));
    };

    return (
        <div className="subcategory-management">
            <h1>Subcategory Management</h1>
            <SubcategoryForm onSubmit={handleAddSubcategory} categories={categories} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ListGroup>
                    {subcategories.map((subcategory) => (
                        <ListGroup.Item key={subcategory.id}>
                            {categories.find((category) => category.id === subcategory.CategoryId)?.name} - {subcategory.name}
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteSubcategory(subcategory.id)}
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SubcategoryManagement;