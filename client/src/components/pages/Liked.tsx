import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLikedProducts } from '../../store/modules/Product/productActions';
import { fetchCartItems } from '../../store/modules/Cart/cartActions';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../common/ProductCard';
import {Container} from "@mui/material";

const Liked = () => {
    const userId = 1;
    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    const {products: cartProducts} = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLikedProducts(userId));
        dispatch(fetchCartItems());
    }, [dispatch, userId])
    
    return (
        <Container sx={{marginTop:'100px',marginBottom:'25px'}}>
            <Grid container columns={1} spacing={4}>
            {likedProducts && likedProducts.length > 0 ? (

                likedProducts.map((product) => (
                    <Grid component='div' xs={1}>
                    <ProductCard
                        key={product.id}
                        product={product}
                        isLiked={true}
                        inCart={cartProducts.some(cartProduct => cartProduct.id === product.id)}/>
                    </Grid>
                ))
            ) : (
                <p>No liked products found.</p>
            )}
        </Grid>
</Container>
    )
}

export default Liked;