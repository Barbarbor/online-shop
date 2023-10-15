import React from 'react';
import { Container, Card } from 'react-bootstrap';

function ProductDetail({ product }) {
    if (!product || !product.SubcategoryId) {
        return <p>Loading product details...</p>;
    }

    return (
        <Container>
            <Card>
                <Card.Img variant="top" src={product.photography_url} alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        <p>Category: {product.CategoryId.name}</p>
                        <p>Subcategory: {product.SubcategoryId.name}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                    </Card.Text>
                    <p>Description: {product.description}</p>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default ProductDetail;