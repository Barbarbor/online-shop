import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchLikedProducts } from '../../store/modules/Product/actions';
import {fetchCartItems} from "../../store/modules/Cart/actions";

import NavPanel from '../common/NavPanel';
import CategoriesDropdown from '../common/CategoriesDropdown';
import ProductCard from '../common/ProductCard';
import Search from '../common/Search';

import Grid from '@mui/material/Unstable_Grid2';
import {Container} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery"
function MainPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const liked_products = useSelector( (state) => state.likedProducts.products );
    const userId = 1;
    const cart_products = useSelector((state) => state.cart.products );
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px)');

    useEffect(() => {
        const fetchData = async () => {
            // Fetch liked products first
            await dispatch(fetchLikedProducts(userId));
            await dispatch(fetchCartItems())
            // Then fetch all products
            dispatch(fetchAllProducts());
        };

        fetchData(); // Call the async function to fetch data in the desired order
    }, [dispatch, userId]);


    return (
        <div>
            <NavPanel />
            <Container>
                <Search />
                <Grid container columns={isDesktop? 3:(isTablet? 2:(isMobile? 1:1))} spacing={4} justifyContent={'center'}>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <Grid item xs={1}>

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isLiked={liked_products.some(likedProduct => likedProduct.id === product.id)}
                                    inCart={cart_products.some(cartProduct => cartProduct.id === product.id)} />

                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default MainPage;