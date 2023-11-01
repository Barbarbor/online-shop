import React,{useState} from 'react';
import {  Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/modules/Cart/actions';
import {Card,CardMedia,CardContent,Typography, Container} from '@mui/material';
import {ReactSVG} from 'react-svg';
import Heart from '../assets/icons/heart.svg';
import TrashIcon from '../assets/icons/trash-icon.svg';
import {unlikeProduct,likeProduct} from "../store/modules/Like/actions";
import heart from "../assets/icons/heart.svg";

function CartItemCard({ cartItem,product,Liked }) {
    const iconSize = 24;
    const [isLiked, setIsLiked] = useState(Liked);
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem));
    };
    const handleLikeClick = () => {

        dispatch(likeProduct(product.id));
        setIsLiked(true);
    }
    const handleUnlikeClick = () => {
        dispatch(unlikeProduct(product.id));
        setIsLiked(false);
    };
    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',maxWidth:800}}>
            <CardMedia
                component="img"
                image='media/hands-cream.png'
                alt="Product"
                style={{ maxWidth: '200px', maxHeight: '150px' }}

                />
            <div className='mb-4'>
            <CardContent>

                <Typography variant="h5"  >
                    {product.name}
                </Typography>
            </CardContent>
            <div className="d-flex align-items-center justify-content-between">
            {isLiked ? (
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
            <ReactSVG
            src={TrashIcon}
            onClick={handleRemoveFromCart}
            beforeInjection={(svg) => {
                svg.setAttribute('width', iconSize);
                svg.setAttribute('height', iconSize);

            }}
            alt='Trash'
            className="trash-icon"
            />
            </div>
        </div>
        </Card>
    );
}

export default CartItemCard;