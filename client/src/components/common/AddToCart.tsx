import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';

import {useNavigate} from "react-router-dom";
import '../../styles/ProductCard.scss';
import { IProduct } from '../../models/IProduct';
import { addToCart } from '../../store/modules/Cart/cartActions';

import '../../styles/ProductCard.scss';

interface AddToCartProps {
    product: IProduct;
    inCartInitial: boolean; 
}


const AddToCart : FC<AddToCartProps> = ({product, inCartInitial}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [inCart, setInCart] = useState<boolean>(inCartInitial);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setInCart(true);
    };

    const handleToCartNavigate = () => {
        navigate('/cart');
    };

    return (
        <button 
            className='button-add-to-cart'
            onClick={inCart ? handleToCartNavigate : handleAddToCart}
        >
            {inCart ? 'In cart' : 'Add to cart'}

        </button>
    );
}
export default AddToCart;
