import TrashIcon from '../assets/icons/trash-icon.svg';
import { useDispatch } from 'react-redux';
import {removeFromCart} from "../store/modules/Cart/actions";
import { ReactSVG } from 'react-svg';
import React from "react";
import './globals.scss';
function Trash({cartItem}) {
    const iconSize = 24;
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem));
    };
    return (
        <button className="button" id='trash'>
        <ReactSVG
            src={TrashIcon}
            onClick={handleRemoveFromCart}
            beforeInjection={(svg) => {
                svg.setAttribute('width', iconSize);
                svg.setAttribute('height', iconSize);
            }}
            alt="Trash"

        />
        </button>
    )
}
export default Trash;