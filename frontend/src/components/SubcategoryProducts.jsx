import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavPanel from "./NavPanel";
import{fetchSubcategoryProducts} from "../store/modules/Product/actions";

function SubcategoryProducts() {
    const { subcategoryId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.filteredProducts.products);
    const loading = useSelector(state => state.filteredProducts.loading);
    const error = useSelector(state => state.filteredProducts.error);

    useEffect(() => {
        console.log('Fetching data for subcategoryId:', subcategoryId);
        dispatch(fetchSubcategoryProducts(subcategoryId));
    }, [subcategoryId, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <NavPanel />
            {products.map((product) => (
                <ProductCard key={product.id} product={product} inCart={false} isLiked={true} />
            ))}
        </div>
    );
}

export default SubcategoryProducts;
