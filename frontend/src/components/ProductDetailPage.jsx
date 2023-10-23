import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/actions/productActions'; // Update the path
import ProductDetail from './ProductDetail';
import NavPanel from "./NavPanel";

function ProductDetailPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();

    // Fetch product details from Redux state
    const product = useSelector((state) => state.product.product);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        // Dispatch the action to fetch the product details based on the productId
        dispatch(fetchProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>
            <NavPanel/>
            {loading ? (
                <p>Loading product details...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ProductDetail product={product} />
            )}
        </div>
    );
}

export default ProductDetailPage;