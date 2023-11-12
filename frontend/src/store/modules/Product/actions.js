import axios from "axios";
import {HOST} from "../../../constants";

export const FETCH_ALL_PRODUCTS_REQUEST = 'FETCH_ALL_PRODUCTS_REQUEST';
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_ALL_PRODUCTS_SUCCESS';
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE';


export const FETCH_SUBCATEGORY_PRODUCTS_REQUEST = 'FETCH_SUBCATEGORY_PRODUCTS_REQUEST';
export const FETCH_SUBCATEGORY_PRODUCTS_SUCCESS = 'FETCH_SUBCATEGORY_PRODUCTS_SUCCESS';
export const FETCH_SUBCATEGORY_PRODUCTS_FAILURE = 'FETCH_SUBCATEGORY_PRODUCTS_FAILURE';


export const FETCH_LIKED_PRODUCTS_REQUEST = 'LIKED_PRODUCTS_REQUEST';
export const FETCH_LIKED_PRODUCTS_SUCCESS = 'LIKED_PRODUCTS_SUCCESS';
export const FETCH_LIKED_PRODUCTS_FAILURE = 'LIKED_PRODUCTS_FAILURE';


export const FETCH_SEARCHED_PRODUCTS_REQUEST = 'FETCH_SEARCHED_PRODUCTS_REQUEST';
export const FETCH_SEARCHED_PRODUCTS_SUCCESS = 'FETCH_SEARCHED_PRODUCTS_SUCCESS';
export const FETCH_SEARCHED_PRODUCTS_FAILURE = 'FETCH_SEARCHED_PRODUCTS_FAILURE';


export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';



export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';


export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';


export const fetchAllProductsRequest = () => ({
    type:FETCH_ALL_PRODUCTS_REQUEST,
});
export const fetchAllProductsSuccess = (products) => ({
    type:FETCH_ALL_PRODUCTS_SUCCESS,
    payload:products,
});
export const fetchAllProductsFailure = (error) => ({
    type:FETCH_ALL_PRODUCTS_FAILURE,
    error,
});


export const fetchSubcategoryProductsRequest = () => ({
    type:FETCH_SUBCATEGORY_PRODUCTS_REQUEST,

});
export const fetchSubcategoryProductsSuccess = (products) => ({
    type: FETCH_SUBCATEGORY_PRODUCTS_SUCCESS,
    payload: products,
});
export const fetchSubcategoryProductsFailure = (error) => ({
    type:FETCH_SUBCATEGORY_PRODUCTS_FAILURE,
    error,
});


export const fetchLikedProductsRequest = () => ({
    type: FETCH_LIKED_PRODUCTS_REQUEST,
});
export const fetchLikedProductsSuccess = (likes) => ({
    type: FETCH_LIKED_PRODUCTS_SUCCESS,
    payload: likes,
});
export const fetchLikedProductsFailure = (error) => ({
    type: FETCH_LIKED_PRODUCTS_FAILURE,
    error,
})


export const fetchSearchedProductsRequest = () =>({
    type: FETCH_SEARCHED_PRODUCTS_REQUEST,
});
export const fetchSearchedProductsSuccess = (products) =>({
    type: FETCH_SEARCHED_PRODUCTS_SUCCESS,
    payload:products,
});
export const fetchSearchedProductsFailure = (error) =>({
    type: FETCH_SEARCHED_PRODUCTS_FAILURE,
    payload:error,
});


export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST,
});
export const fetchProductSuccess = (product) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: product,
});
export const fetchProductFailure = (error) => ({
    type: FETCH_PRODUCT_FAILURE,
    error,
});


export const addProductRequest = () => ({
    type: ADD_PRODUCT_REQUEST,
});
export const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
});
export const addProductFailure = (error) => ({
    type: ADD_PRODUCT_FAILURE,
    error,
});


export const deleteProductRequest = () =>({
    type: DELETE_PRODUCT_REQUEST,
})
export const deleteProductSuccess = (id) =>({
    type: DELETE_PRODUCT_SUCCESS,
    payload: id,
})
export const deleteProductFailure = (error) =>({
    type: DELETE_PRODUCT_FAILURE,
    error,
})


export const fetchAllProducts = () => {
    return async (dispatch) => {
        dispatch(fetchAllProductsRequest());
        try {
            const response = await axios.get(`${HOST}/api/products`);
            dispatch(fetchAllProductsSuccess(response.data));
        }
        catch(error){
            dispatch(fetchProductFailure(error));
        }
    };
};


export const fetchSubcategoryProducts = (subcategoryId) => async (dispatch) => {
    dispatch(fetchSubcategoryProductsRequest());

    try {
        const response = await axios.get(`${HOST}/api/products/subcategory/${subcategoryId}`);
        dispatch(fetchSubcategoryProductsSuccess(response.data));
    } catch (error) {
        dispatch(fetchSubcategoryProductsFailure());
        };
    };


export const fetchLikedProducts = (userId) => {
    return async (dispatch) => {
        dispatch(fetchLikedProductsRequest());
        try {
            // Make a GET request to fetch liked products by user ID
            const response = await axios.get(`${HOST}/api/likes?UserId=${userId}`);

            // Dispatch the action with the fetched liked products
            dispatch(fetchLikedProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchLikedProductsFailure(error));
        }
    };
};

export const fetchSearchedProducts = (searchQuery) => {
    return async (dispatch) => {
        dispatch(fetchSearchedProductsRequest());
        try {
            const response = await axios.get(`${HOST}/api/product/search?searchQuery=${searchQuery}`);
            dispatch(fetchSearchedProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchSearchedProductsFailure(error));
        }
    };
};

export const fetchSearchedProductsWithoutDispatch = async (searchQuery) => {
    const response = await axios.get(`${HOST}/api/product/search?searchQuery=${searchQuery}`);
    return response.data;

}

export const fetchProduct = (productId) => {
    return async (dispatch) => {
        dispatch(fetchProductRequest());
        try {
            const response = await axios.get(`${HOST}/api/products/${productId}`);
            dispatch(fetchProductSuccess(response.data));

        } catch (error) {
            dispatch(fetchProductFailure(error))
        }

    };
};


export const addProduct = (productData) => {
    return async (dispatch) => {
        dispatch(addProductRequest());
        try {
            const response = await axios.post(`${HOST}/api/products`, productData);
            dispatch(addProductSuccess(response.data));
        } catch (error) {
            dispatch(addProductFailure(error));
        }
    };
};

export const deleteProduct = (productId) =>{
    return async(dispatch) => {
        dispatch(deleteProductRequest());
        try {
            await axios.delete(`${HOST}/api/products/${productId}`);
            dispatch(deleteProductSuccess(productId));
        } catch (error) {
            dispatch(deleteProductFailure(error));
        }

    };
};
