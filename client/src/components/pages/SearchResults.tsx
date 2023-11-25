import React from 'react'

import { useAppSelector } from '../../hooks/redux'
import { useParams } from 'react-router-dom';

import ProductCard from '../common/ProductCard';
import Search from '../common/Search';
import NavPanel from "../common/NavPanel";

import { CircularProgress,Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
const SearchResults = () => {
    const {searchQuery} = useParams<string>();
    const {products: searchedProducts, isLoading} = useAppSelector(state => state.productsSearchedReducer);

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
                <Grid container columns={1}>
                    {searchedProducts.map((product) => (
                        <Grid component='div' xs={1}>
                        <ProductCard key={product.id} product={product} isLiked={false} inCart={false}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            </Container>
        </div>
    ) 
}

export default SearchResults;