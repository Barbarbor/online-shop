import React, { FC, useEffect } from 'react'
import {useUser} from "../../hooks/useUser";
import {useNavigate, useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProductById } from '../../store/modules/Product/productActions';
import {addToCart, fetchCartItems} from '../../store/modules/Cart/cartActions';

import {Breadcrumbs, Accordion,AccordionDetails,AccordionSummary,Typography,Card,CardContent, CircularProgress} from "@mui/material";
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../styles/ProductDetail.scss';


const ProductDetailPage = () => {
    const navigate = useNavigate();
    const {currentUser} = useUser();
    const { productId } = useParams<string>();
    const dispatch = useAppDispatch();
    const {products: cartProducts} = useAppSelector(state => state.cartReducer);
    const {product, isLoading, error} = useAppSelector(state => state.productReducer);
    const category = product.category;
    const subcategory = product.subcategory;

    useEffect(() => {
        dispatch(fetchProductById(Number(productId)));
        if(currentUser) {
            const userId = currentUser.id
            dispatch(fetchCartItems(userId));
        }
    }, [dispatch]);
   
    const handleAddToCart = () => {
        if (!currentUser)
        {
            alert('You need to be log in for adding items to cart');
        }
        else {
            const userId = currentUser.id;
            if(!inCart)
            dispatch(addToCart(product,userId));
            else
                navigate('/cart');
        }
    }


    if (!product) {
        return <CircularProgress color="inherit" />;
    }
    const inCart= cartProducts.some(cartProduct => cartProduct.id === product.id)
    return (
        <div className='product-detail-page'>
            <Breadcrumbs  className='product-breadcrumbs'>
                <Link underline='hover' color='inherit' href='/'>
                    <Typography>Main</Typography>
                </Link>
    
                <Link underline='hover' color='inherit' href="/">
                    <Typography>{category?.name}</Typography>
                </Link>
    
                <Link underline='hover' color='inherit' href='/'>
                    <Typography>{subcategory?.name}</Typography>
                </Link>
    
            </Breadcrumbs>
            <Typography className='product-detail-name'>{product?.name} </Typography>
                <img className='product-detail-photo' src={product.photography_url} alt='product-photo'/>
            <Accordion className='product-detail-desc-accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails className='product-detail-desc-accordion-details'>
                    <Typography className='product-detail-desc-accordion-details-text'>
                        {product.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Card className='product-detail-delivery-info-container' raised={true}>
                <CardContent className='product-detail-delivery-info-items'>
                    <Typography className='product-detail-delivery-info-price'>
                        {product.price}$
                    </Typography>
                    <button className='product-detail-delivery-info-add-to-cart' onClick={handleAddToCart} >{inCart? ("To cart") : ("Add to cart") }</button>
                </CardContent>
    
            </Card>   
        </div>
    );
}

export default ProductDetailPage;