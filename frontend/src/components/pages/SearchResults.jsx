import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import ProductCard from '../common/ProductCard';
import NavPanel from "../common/NavPanel";
import Search from "../common/Search";

import {Container} from "@mui/material";

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
        <Container disableGutters={true}>
            <NavPanel/>
            <Search defaultValue={searchQuery}/>
            {searchResults.length === 0 ? (
                <p>0 products were found for your request.</p>
            ) : (
                <div>
                    <h2>Search Results</h2>
                    {searchResults.map((product) => (
                        <ProductCard key={product.id} product={product} />

                    ))}
                </div>
            )}
        </Container>
    );
}

export default SearchResults;