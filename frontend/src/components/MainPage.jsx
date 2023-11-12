import React, { useEffect } from 'react';
import {  Row, Col } from 'react-bootstrap';
import {Container,} from "@mui/material";

import NavPanel from './NavPanel';
import Grid from '@mui/material/Unstable_Grid2';
import CategoriesDropdown from './CategoriesDropdown';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary hooks
import { fetchAllProducts, fetchLikedProducts } from '../store/modules/Product/actions'; // Import the action
import {fetchCartItems} from "../store/modules/Cart/actions";
import Search from './Search';
function MainPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const liked_products = useSelector( (state) => state.likedProducts.products );
    const userId = 1;
    const cart_products = useSelector((state) => state.cart.products );
    useEffect(() => {
        const fetchData = async () => {
            // Fetch liked products first
            await dispatch(fetchLikedProducts(userId));

            // Then fetch all products
            dispatch(fetchAllProducts());
            dispatch(fetchCartItems())
        };

        fetchData(); // Call the async function to fetch data in the desired order
    }, [dispatch, userId]);

    console.log("liked products:", liked_products);
    return (
        <div>
            <NavPanel />
            <Container>
                <Search />
                <Grid container columns={4}>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <Grid item xs={1}>

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isLiked={liked_products.some(likedProduct => likedProduct.id === product.id)}
                                    inCart={cart_products.some(cartProduct => cartProduct.id === product.id)} />

                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default MainPage;