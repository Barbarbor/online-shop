import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heart from '../assets/icons/heart.svg';
import {likeProduct, unlikeProduct} from "../store/modules/Like/actions";
import {ReactSVG} from "react-svg";
import './globals.scss';
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
                <ReactSVG
                    onClick={handleUnlikeClick} // Handle unlike
                    src={heart}
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', iconSize);
                        svg.setAttribute('height', iconSize);
                        svg.setAttribute('fill', 'red'); // Initially red for liked products
                    }}
                    alt="Liked"


                />
                </button>

            ) : (
                <button className='button-like-icon'>
                <ReactSVG
                    onClick={handleLikeClick}
                    src={heart}
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', iconSize);
                        svg.setAttribute('height', iconSize);
                    }}
                    alt="Like"

                />
                </button>
            )}

        </div>
    )
}
export default Like;
