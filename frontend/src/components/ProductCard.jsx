import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import { likeProduct } from '../store/actions/likeActions'; // Import the like actions
import heart from '../icons/heart.svg';
import { ReactSVG } from 'react-svg';

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const likedProducts = useSelector((state) => state.likes.products);

    const isLiked = likedProducts.includes(product.id);

    const handleLikeClick = () => {
        dispatch(likeProduct(product.id));
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const iconSize = 24; // Adjust the icon size here

    return (
        <Card>
            <Card.Img variant="top" src={`http://localhost:3001/media/${product.photography_url}`} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Button onClick={handleAddToCart}>Add to Cart</Button>

                {isLiked ? (
                    <ReactSVG
                        onClick={handleLikeClick}
                        src={heart}
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', iconSize);
                            svg.setAttribute('height', iconSize);
                            svg.setAttribute('fill', 'red');
                        }}
                        alt="Liked"
                        className="heart-icon"
                    />
                ) : (
                    <ReactSVG
                        onClick={handleLikeClick}
                        src={heart}
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', iconSize);
                            svg.setAttribute('height', iconSize);
                        }}
                        alt="Like"
                        className="heart-icon"
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
