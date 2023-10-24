import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../forms/ProductForm';
import { fetchProducts, addProduct, deleteProduct } from '../../store/actions/productManagementActions';
import { fetchCategories } from '../../store/actions/categoryManagementActions';
import { fetchSubcategories } from '../../store/actions/subcategoryManagementActions';
import { Button, ListGroup } from 'react-bootstrap';

const ProductManagement = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productManagement.products);
    const loading = useSelector((state) => state.productManagement.loading);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchSubcategories());
    }, [dispatch]);

    const handleAddProduct = (newProduct) => {
        dispatch(addProduct(newProduct));
    };

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <div className="product-management">
            <h1>Product Management</h1>
            <ProductForm onSubmit={handleAddProduct} categories={categories} subcategories={subcategories} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ListGroup>
                    {products.map((product) => (
                        <ListGroup.Item key={product.id}>
                            {product.name}
                            <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default ProductManagement;