import React, { FC } from "react";

import { ICartItem } from "../../models/ICartItem";

import { useAppDispatch } from "../../hooks/redux";
import { removeFromCart } from "../../store/modules/Cart/cartActions";

import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/globals.scss';

interface TrashProps {
    cartItem: ICartItem
}

const Trash : FC<TrashProps> = ({cartItem}) => {

    const dispatch = useAppDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem));
    };
    return (
        <button className="button" id='trash'>
            <DeleteIcon
                onClick={handleRemoveFromCart}
            />
        </button>
    )
}
export default Trash;