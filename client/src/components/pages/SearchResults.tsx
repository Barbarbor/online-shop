import React from 'react'

import { useAppSelector } from '../../hooks/redux'
import { useParams } from 'react-router-dom';

import ProductCard from '../common/ProductCard';
import Search from '../common/Search';
import { CircularProgress } from '@mui/material';

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
            <Search defaultValue={searchQuery}/>
            {searchedProducts.length === 0 ? (
                <p>0 products were found for your request.</p>
            ) : (
                <div>
                    <h2>Search Results</h2>
                    {searchedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} isLiked={false} inCart={false}/>
                    ))}
                </div>
            )}
        </div>
    ) 
}

export default SearchResults;