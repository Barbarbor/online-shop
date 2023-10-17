import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavPanel from './NavPanel';
import CategoriesDropdown from './CategoriesDropdown';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux'; // Import the necessary hooks
import { fetchAllProducts } from '../store/actions/mainPageActions'; // Import the action

function MainPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.mainPage.products);
    const loading = useSelector((state) => state.mainPage.loading);

    useEffect(() => {
        // Dispatch the action to fetch products when the component mounts
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <div>
            <NavPanel />
            <Container>

                <Row>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <Col key={product.id} sm={4}>
                                <ProductCard product={product} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default MainPage;