import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {fetchSubcategoryProducts} from "../../store/modules/Product/actions";

import ProductCard from "../common/ProductCard";
import NavPanel from "../common/NavPanel";

//TODO: add some styling, also selected subcategory(and probably category) display

function SubcategoryProducts() {
    const { subcategoryId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.filteredProducts.products);
    const loading = useSelector(state => state.filteredProducts.loading);


    useEffect(() => {
        dispatch(fetchSubcategoryProducts(subcategoryId));
    }, [subcategoryId, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
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
