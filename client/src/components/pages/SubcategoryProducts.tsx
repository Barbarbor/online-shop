import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";

import { fetchSubcategoryProducts } from "../../store/modules/Product/productActions";

import ProductCard from "../common/ProductCard";
import { CircularProgress } from "@mui/material";

const SubcategoryProducts = () => {
    const {subcategoryId} = useParams();
    const parsedSubcategoryId = subcategoryId ? parseInt(subcategoryId, 10) : undefined;

    const dispatch = useAppDispatch();
    const {products, isLoading, error} = useAppSelector(state => state.productsFilteredReducer);

    useEffect(() => {
        dispatch(fetchSubcategoryProducts(parsedSubcategoryId as number))
    }, [subcategoryId, dispatch])

    if (isLoading) {
        return (
            <CircularProgress color="inherit" />
        )
    }

    if (error) {
        return (
            <div>
                Error: {error}
            </div>
        )
    }

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} inCart = {false} isLiked={true}/>
            ))}
        </div>
    )
}

export default SubcategoryProducts;