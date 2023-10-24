import React, {  useEffect } from "react";
import ProductCard from "./ProductCard";
import { connect } from 'react-redux';
import { fetchSubcategoryProducts } from '../store/actions/categoryActions';
import { useParams } from 'react-router-dom';
import NavPanel from "./NavPanel";

function SubcategoryProducts({  products, loading, error, fetchSubcategoryProducts }) {
    const { subcategoryId } = useParams();
    useEffect(() => {
        console.log('Fetching data for subcategoryId:', subcategoryId);
        // Fetch subcategory products when the component mounts
        fetchSubcategoryProducts(subcategoryId);
    }, [subcategoryId, fetchSubcategoryProducts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (

        <div>
            <NavPanel/>
            {/* Render the products */}
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    products: state.category.products,
    loading: state.category.loading,
    error: state.category.error,
});

const mapDispatchToProps = {
    fetchSubcategoryProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryProducts);
