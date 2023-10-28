import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavPanel from './NavPanel';
import CategoriesDropdown from './CategoriesDropdown';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary hooks
import { fetchAllProducts } from '../store/actions/mainPageActions'; // Import the action
import {fetchLikedProducts} from "../store/actions/likeActions";
import Search from './Search';
function MainPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.mainPage.products);
    const loading = useSelector((state) => state.mainPage.loading);
    const userId = 1;
    useEffect(() => {
        const fetchData = async () => {
            // Fetch liked products first
            await dispatch(fetchLikedProducts(userId));

            // Then fetch all products
            dispatch(fetchAllProducts());
        };

        fetchData(); // Call the async function to fetch data in the desired order
    }, [dispatch, userId]);

        const liked_products = useSelector( (state) => state.likes.products );
    console.log("liked products:", liked_products);
    return (
        <div>
            <NavPanel />

            <Container>
                <Search />
                <Row>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <Col key={product.id} sm={4}>
                                <ProductCard product={product} isLiked={liked_products.some(likedProduct => likedProduct.id === product.id)} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default MainPage;