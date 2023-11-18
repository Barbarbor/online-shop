import React, {useState,useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addToCart} from "../../store/modules/Cart/actions";
import {useNavigate} from "react-router-dom";
import '../../styles/ProductCard.scss';
function AddToCart({product,inCartInitial}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inCart, setInCart] = useState(inCartInitial);

    const handleAddToCart = () => {

        dispatch(addToCart(product));
        setInCart(true);

    };
    const handleToCartNavigate = () => {
        navigate('/cart');
    };
    if(!inCart)
    return(
        <button className='button-add-to-cart' onClick={handleAddToCart}>Add to cart</button>

    )
    else
        return(
            <button className='button-add-to-cart' onClick={handleToCartNavigate}>To cart</button>
        )
}
export default AddToCart;
