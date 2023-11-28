import React, { useEffect, ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllProducts, fetchLikedProducts, fetchLimitedProducts, setProductsCurrentPage } from '../../store/modules/Product/productActions';
import { fetchCartItems } from '../../store/modules/Cart/cartActions';

import Grid from '@mui/material/Unstable_Grid2';
import {CircularProgress, Container, Pagination} from "@mui/material";
import ProductCard from '../common/ProductCard';
import Search from '../common/Search';
import useMediaQuery from "@mui/material/useMediaQuery"
const MainPage = () => {
    const userId = 1;
    const {products: productList, isLoading, error, limit, page, totalCount} = useAppSelector(state => state.productsGlobalReducer);
    const {products: cartProducts } = useAppSelector(state => state.cartReducer);
    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    const dispatch = useAppDispatch();
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px)');
    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(setProductsCurrentPage(value));
    };

    useEffect(() => {
        //if(!productList)
            dispatch(fetchLimitedProducts(page, limit));

        //if(!cartProducts)
            dispatch(fetchCartItems());
       // if(!likedProducts)
            dispatch(fetchLikedProducts(userId))

    }, [dispatch, userId, page])

    return (
        <div>
            <Container>
                <Search />
                <Grid container columns={isDesktop? 3:(isTablet? 2:(isMobile? 1:1))} spacing={4} >
                    {isLoading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        productList.map((product) => (
                            <Grid component="div" xs={1}>
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isLiked={likedProducts
                                            .some(likedProduct => likedProduct.id === product.id)}
                                    inCart={cartProducts
                                            .some(cartProduct => cartProduct.id === product.id)} />
                            </Grid>
                        ))
                    )}
                </Grid>
                <Pagination
                    count={Math.ceil(totalCount / limit)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    style={{ marginTop: '20px' }}
                />
            </Container>
        </div>
    )
}

export default MainPage;
