import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import NavPanel from "./NavPanel";
import Search from "./Search";
import { useParams } from 'react-router-dom';
function SearchResults() {
    const {searchQuery} = useParams();
    const searchResults = useSelector((state) => state.searchedProducts.products);
    console.log(searchResults);
    return (
        <div>
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
        </div>
    );
}

export default SearchResults;