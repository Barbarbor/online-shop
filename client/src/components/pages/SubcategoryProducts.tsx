import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import React, { useEffect } from "react";

import {fetchLikedProducts, fetchSubcategoryProducts} from "../../store/modules/Product/productActions";
import {useUser} from "../../hooks/useUser";
import ProductCard from "../common/ProductCard";
import NavPanel from "../common/NavPanel";
import Search from '../common/Search';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress,Typography,Link,Breadcrumbs,Container } from "@mui/material";
import {fetchCartItems} from "../../store/modules/Cart/cartActions";

const SubcategoryProducts = () => {
    const {subcategoryId} = useParams();
    const parsedSubcategoryId = subcategoryId ? parseInt(subcategoryId, 10) : undefined;
    const {currentUser} = useUser();
    const dispatch = useAppDispatch();
    const {products, isLoading} = useAppSelector(state => state.productsFilteredReducer);
    const {products: cartProducts} = useAppSelector( (state) => state.cartReducer)

    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    useEffect(() => {
        dispatch(fetchSubcategoryProducts(parsedSubcategoryId as number));
        if(currentUser){
            dispatch(fetchLikedProducts(currentUser.id));
            dispatch(fetchCartItems(currentUser.id));
        }
    }, [subcategoryId])

    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }


    return (
        <Container disableGutters={true}>
            <NavPanel />
            <Search/>
            <Grid container columns={1}>
            {products.map((product) => (
                <Grid component="div" xs={1} sx={{height:'246px'}}>
                    <ProductCard
                        key={product.id}
                        product={product}
                        isLiked={likedProducts
                            .some(likedProduct => likedProduct.id === product.id)}

                        inCart={cartProducts
                            .some(cartProduct => cartProduct.id === product.id)} />
                </Grid>
            ))}
            </Grid>
        </Container>
    )
}

export default SubcategoryProducts;