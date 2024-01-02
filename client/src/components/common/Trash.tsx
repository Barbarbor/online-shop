import React, { FC } from "react";
import {useUser} from "../../hooks/useUser";
import { ICartItem } from "../../models/ICartItem";

import { useAppDispatch } from "../../hooks/redux";
import { removeFromCart } from "../../store/modules/Cart/cartActions";

import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/globals.scss';
import useMediaQuery from "@mui/material/useMediaQuery";

interface TrashProps {
    cartItem: ICartItem;
    userId:number;
}

const Trash : FC<TrashProps> = ({cartItem,userId}) => {
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
    const dispatch = useAppDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem,userId));
    };
    return (
        <button className="button-like-icon" id='trash'>
            <DeleteIcon
                sx={{fontSize:iconSize}}
                onClick={handleRemoveFromCart}
            />
        </button>
    )
}
export default Trash;