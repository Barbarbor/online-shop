import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../forms/ProductForm';
import { fetchAllProducts, addProduct, deleteProduct } from '../../store/modules/Product/actions';
import { fetchCategories } from '../../store/modules/Category/actions';
import { fetchAllSubcategories } from '../../store/modules/Subcategory/actions';
import { Button, ListGroup } from 'react-bootstrap';

const ProductManagement = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productManagement.products);
    const loading = useSelector((state) => state.productManagement.loading);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchCategories());
        dispatch(fetchAllSubcategories());
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