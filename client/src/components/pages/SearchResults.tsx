import React, {useEffect} from 'react'

import { useAppSelector,useAppDispatch } from '../../hooks/redux'
import { useParams } from 'react-router-dom';
import {useUser} from "../../hooks/useUser";
import ProductCard from '../common/ProductCard';
import Search from '../common/Search';
import NavPanel from "../common/NavPanel";

import { CircularProgress,Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {fetchLikedProducts, fetchSearchedProducts} from "../../store/modules/Product/productActions";
import {fetchCartItems} from "../../store/modules/Cart/cartActions";
const SearchResults = () => {
    const {searchQuery} = useParams<string>();
    const {products: searchedProducts, isLoading} = useAppSelector(state => state.productsSearchedReducer);
    const{products: cartProducts} = useAppSelector( (state) => state.cartReducer)
    const {currentUser} = useUser();
    const {products: likedProducts} = useAppSelector(state => state.productsLikedReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(searchQuery)
            dispatch(fetchSearchedProducts(searchQuery));
        if(currentUser){
            dispatch(fetchLikedProducts(currentUser.id));
            dispatch(fetchCartItems(currentUser.id));
        }

    }, []);
    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    return (
        <div>
            <NavPanel/>
            <Container>
                <Search defaultValue={searchQuery}/>
                {searchedProducts.length === 0 ? (
                    <p>0 products were found for your request.</p>
                ) : (
                    <Grid container columns={2}>
                        {searchedProducts.map((product) => (
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
                )}
            </Container>
        </div>
    )
}

export default SearchResults;