import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import NavPanel from "./NavPanel";
import Search from "./Search";
function SearchResults() {
    const searchResults = useSelector((state) => state.search.results);

    return (
        <div>
            <NavPanel/>
            <Search/>
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