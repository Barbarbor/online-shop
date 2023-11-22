import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {fetchSubcategoryProducts} from "../../store/modules/Product/actions";

import ProductCard from "../common/ProductCard";
import NavPanel from "../common/NavPanel";
import Search from '../common/Search';

import {Container, Breadcrumbs, Link, Typography} from "@mui/material";
//TODO: add some styling, also selected subcategory(and probably category) display

function SubcategoryProducts() {
    const { subcategoryId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.filteredProducts.products);
    const loading = useSelector(state => state.filteredProducts.loading);
    const category = useSelector( state => state.filteredProducts.category);
    const subcategory = useSelector( state => state.filteredProducts.subcategory);

    useEffect(() => {
        dispatch(fetchSubcategoryProducts(subcategoryId));
    }, [subcategoryId, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <Container disableGutters={true}>
            <NavPanel />
            <Search/>
            <Breadcrumbs>
                <Link underline='hover' color='inherit' href='/'>
                    <Typography>{category}</Typography>
                </Link>
                <Link underline='hover' color='inherit' href='/'>
                    <Typography>{subcategory}</Typography>
                </Link>
            </Breadcrumbs>

            {products.map((product) => (
                <ProductCard key={product.id} product={product} inCart={false} isLiked={true} />
            ))}
        </Container>
    );
}

export default SubcategoryProducts;
