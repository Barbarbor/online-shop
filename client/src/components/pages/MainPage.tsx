import React, { useEffect, ChangeEvent, useMemo } from 'react'
import {useUser} from "../../hooks/useUser";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllProducts, fetchLikedProducts, fetchLimitedProducts, setProductsCurrentPage } from '../../store/modules/Product/productActions';
import { fetchCartItems } from '../../store/modules/Cart/cartActions';
import {CartStateMultiple} from "../../store/types/Cart";
import Grid from '@mui/material/Unstable_Grid2';
import {CircularProgress, Container, Pagination} from "@mui/material";
import ProductCard from '../common/ProductCard';
import Search from '../common/Search';
import useMediaQuery from "@mui/material/useMediaQuery"
import {RootState} from "../../store/store";


const MainPage = () => {
    const {currentUser} = useUser();
    let userId:number;
    if(currentUser){
        userId = currentUser.id;


    }
    else{
        userId = 1;
    }
    const {products: productList, isLoading, error, limit, page, totalCount} = useAppSelector(state => state.productsGlobalReducer);
    const isProductsFetched = useAppSelector((state) => state.productsGlobalReducer.products.length > 0)
// Проверка наличия объекта и свойства products
    const{products: cartProducts} = useAppSelector( (state) => state.cartReducer)

    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    const dispatch = useAppDispatch();
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px)');
    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(setProductsCurrentPage(value));
    };

    useEffect(() => {
        const fetchData = async () => {
            // Проверяем, есть ли текущий пользователь
            if (currentUser) {
                try {
                    // Выполняем fetchCartItems только если есть текущий пользователь

                    dispatch(fetchCartItems(currentUser.id));
                } catch (error) {
                    console.error('Ошибка при загрузке корзины:', error);
                }
            }
        };

            dispatch(fetchLimitedProducts(page, limit));

        //if(!cartProducts)
            fetchData();
            // if(!likedProducts)
            dispatch(fetchLikedProducts(userId))

    }, [page,currentUser])

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
