import React, { FC, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { likeProduct, unlikeProduct } from '../../store/modules/Like/likeActions';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../../styles/globals.scss';

interface LikeProps {
  product: IProduct;
  isLiked: boolean;
}

const Like: FC<LikeProps> = ({ product, isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    const dispatch = useAppDispatch();

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
            <FavoriteBorderIcon htmlColor={liked ? 'red' : 'gray'} />
        </button>
      );
};

export default Like;