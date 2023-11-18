import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/modules/Cart/actions';
import { fetchProduct } from '../../store/modules/Product/actions'; // Update the path

import NavPanel from "../common/NavPanel";
import Like from '../common/Like';
import AddToCart from "../common/AddToCart";

import '../../styles/ProductDetail.scss';

import {Breadcrumbs, Accordion,AccordionDetails,AccordionSummary,Typography,Paper,Card,CardContent} from "@mui/material";
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProductDetailPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();

    // Fetch product details from Redux state
    const product = useSelector((state) => state.product.product);
    const category = useSelector((state) => state.product.category);
    const subcategory = useSelector((state) => state.product.subcategory);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        // Dispatch the action to fetch the product details based on the productId
        dispatch(fetchProduct(productId));
    }, []);
    if (!product) {
        return <div>loading...</div>;
    }
        //TODO: characteristics of product
    return (

       <div className='product-detail-page'>
           <NavPanel/>
        <Breadcrumbs  className='product-breadcrumbs'>
            <Link underline='hover' color='inherit' href='/'>
                <Typography>Main</Typography>
            </Link>

            <Link underline='hover' color='inherit' href="/">
                <Typography>{category.name}</Typography>
            </Link>

            <Link underline='hover' color='inherit' href='/'>
                <Typography>{subcategory.name}</Typography>
            </Link>

        </Breadcrumbs>
         <Typography classname='product-detail-name'>{product.name} (name)</Typography>
           <img className='product-detail-photo' src={'http://localhost:3000/media/iphone14.png'} alt='product-photo'/>
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
                <button className='product-detail-delivery-info-add-to-cart' onClick={handleAddToCart} >Add to cart</button>
            </CardContent>

        </Card>

    </div>

    );
}

export default ProductDetailPage;