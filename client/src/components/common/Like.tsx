import { FC, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { likeProduct, unlikeProduct } from '../../store/modules/Like/likeActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useUser} from "../../hooks/useUser";
interface LikeProps {
  product: IProduct;
  isLiked: boolean;
}

const Like: FC<LikeProps> = ({ product, isLiked }) => {
    const {currentUser} = useUser();
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
        iconSize = 24;
    }
    else if(isMobile) {
        iconSize = 24;
    }
    else if(isSmallMobile) {
        iconSize = 24;
    }
    const handleLikeClick = () => {
        if(currentUser) {
            const userId = currentUser.id;
            dispatch(likeProduct(product.id,userId));
            setLiked(true);
        }
        else{
            alert("You need to be log in to like ");
        }
    };

    const handleUnlikeClick = () => {
        if(currentUser) {
            const userId = currentUser.id;
            dispatch(unlikeProduct(product.id,userId));
            setLiked(false);
        }
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