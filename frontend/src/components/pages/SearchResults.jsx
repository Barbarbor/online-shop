import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import ProductCard from '../common/ProductCard';
import NavPanel from "../common/NavPanel";
import Search from "../common/Search";

import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
//TODO: add some styling
function SearchResults() {
    const {searchQuery} = useParams();
    const searchResults = useSelector((state) => state.searchedProducts.products);
    const loading = useSelector((state) => state.searchedProducts.loading);

    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <NavPanel/>
            <Container>
            <Search defaultValue={searchQuery}/>
            {searchResults.length === 0 ? (
                <p>0 products were found for your request.</p>
            ) : (
                <Grid container columns={1}>

                    {searchResults.map((product) => (
                        <Grid item xs={1}>
                        <ProductCard key={product.id} product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
            </Container>
        </div>
    );
}

export default SearchResults;