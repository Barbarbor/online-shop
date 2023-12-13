import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch,useAppSelector } from '../../hooks/redux';
import {useUser} from "../../hooks/useUser";
import {useNavigate} from "react-router-dom";
import '../../styles/ProductCard.scss';
import { IProduct } from '../../models/IProduct';
import { addToCart } from '../../store/modules/Cart/cartActions';
import {ICartItem} from "../../models/ICartItem";
import '../../styles/ProductCard.scss';

interface AddToCartProps {
    product: IProduct;
    inCartInitial: boolean; 
}


const AddToCart : FC<AddToCartProps> = ({product, inCartInitial}) => {
    const {currentUser} = useUser();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [inCart, setInCart] = useState<boolean>(inCartInitial);

    const handleAddToCart = () => {
        if(currentUser) {
            const userId = currentUser.id;
            dispatch(addToCart(product,userId));
            setInCart(true);
        }
        else{
            alert('You need to log in for adding items in cart');
        }
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
