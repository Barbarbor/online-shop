import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {likeProduct, unlikeProduct} from "../../store/modules/Like/actions";

import '../../styles/globals.scss';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//TODO:make custom colors for icons

function Like({product,isLiked}) {
    const [liked, setLiked] = useState(isLiked);
    const dispatch = useDispatch();
    const handleLikeClick = () => {
        dispatch(likeProduct(product.id));
        setLiked(true);
    };
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
