import React from "react";

import { useDispatch } from 'react-redux';
import {removeFromCart} from "../../store/modules/Cart/actions";

import '../../styles/globals.scss';

import DeleteIcon from '@mui/icons-material/Delete';

function Trash({cartItem}) {

    const dispatch = useDispatch();
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