import React, {useState,useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import { likeProduct } from '../store/actions/likeActions';
import { unlikeProduct } from '../store/actions/likeActions';
import {fetchLikedProducts} from "../store/actions/likeActions";
import heart from '../assets/icons/heart.svg';
import { ReactSVG } from 'react-svg';

function ProductCard({ product, isLiked }) {
    const userId = 1;
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(isLiked);
    const handleLikeClick = () => {
        dispatch(likeProduct(product.id));
        setLiked(true);
    };

    const handleUnlikeClick = () => {
        dispatch(unlikeProduct(product.id));
        setLiked(false);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const iconSize = 24;

    return (
        <Card>
            <Card.Img variant="top" src={`http://localhost:3001/media/${product.photography_url}`} alt={product.name} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Button onClick={handleAddToCart}>Add to Cart</Button>

                {liked ? (
                    <ReactSVG
                        onClick={handleUnlikeClick} // Handle unlike
                        src={heart}
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', iconSize);
                            svg.setAttribute('height', iconSize);
                            svg.setAttribute('fill', 'red'); // Initially red for liked products
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