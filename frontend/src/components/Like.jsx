import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heart from '../assets/icons/heart.svg';
import {likeProduct, unlikeProduct} from "../store/modules/Like/actions";
import {ReactSVG} from "react-svg";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './globals.scss';
//TODO:make custom colors for icons
function Like({product,isLiked}) {
    const [liked, setLiked] = useState(isLiked);
    const dispatch = useDispatch();
    const handleLikeClick = () => {
        dispatch(likeProduct(product.id));
        setLiked(true);
    };
    const iconSize = 24;
    const handleUnlikeClick = () => {
        dispatch(unlikeProduct(product.id));
        setLiked(false);
    };
    return (
        <div>
            {liked ? (
                <button className='button-like-icon'>
                <FavoriteBorderIcon
                    onClick={handleUnlikeClick} // Handle unlike
                    htmlColor='red'


                />
                </button>

            ) : (
                <button className='button-like-icon'>
                <FavoriteBorderIcon
                    onClick={handleLikeClick}
                    htmlcolor='gray'
                />
                </button>
            )}

        </div>
    )
}
export default Like;
