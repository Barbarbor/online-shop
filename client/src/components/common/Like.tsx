import React, { FC, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { likeProduct, unlikeProduct } from '../../store/modules/Like/likeActions';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../../styles/globals.scss';
import useMediaQuery from "@mui/material/useMediaQuery";

interface LikeProps {
  product: IProduct;
  isLiked: boolean;
}

const Like: FC<LikeProps> = ({ product, isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    const dispatch = useAppDispatch();
    let iconSize;
    const isDesktop = useMediaQuery('(min-width:1001px)');
    const isTablet = useMediaQuery('(max-width:1000px) and (min-width:701px)');
    const isMobile = useMediaQuery('(max-width:700px) and (min-width:586px)');
    const isSmallMobile = useMediaQuery('(max-width:585px)');
    if(isDesktop){
        iconSize = 24;

    }
    else if(isTablet) {
        iconSize = 20;
    }
    else if(isMobile) {
        iconSize = 16;
    }
    else if(isSmallMobile) {
        iconSize = 12;
    }
    const handleLikeClick = () => {
        dispatch(likeProduct(product.id));
        setLiked(true);
    };

    const handleUnlikeClick = () => {
        dispatch(unlikeProduct(product.id));
        setLiked(false);
    };

    return (
        <button 
            className="button-like-icon"
            onClick={liked ? handleUnlikeClick : handleLikeClick}
            >
            <FavoriteBorderIcon sx={{fontSize:iconSize}} htmlColor={liked ? 'red' : 'gray'} />
        </button>
      );
};

export default Like;