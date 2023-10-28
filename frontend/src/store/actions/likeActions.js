import {HOST} from '../../constants';
import axios from 'axios';

export const FETCH_LIKED_PRODUCTS_REQUEST = 'LIKED_PRODUCTS_REQUEST';
export const FETCH_LIKED_PRODUCTS_SUCCESS = 'LIKED_PRODUCTS_SUCCESS';
export const FETCH_LIKED_PRODUCTS_FAILURE = 'LIKED_PRODUCTS_FAILURE';

export const LIKE_PRODUCT_REQUEST = 'LIKE_PRODUCT_REQUEST';
export const LIKE_PRODUCT_SUCCESS = 'LIKE_PRODUCT_SUCCESS';
export const LIKE_PRODUCT_FAILURE = 'LIKE_PRODUCT_FAILURE';

export const UNLIKE_PRODUCT_REQUEST = 'UNLIKE_PRODUCT_REQUEST';
export const UNLIKE_PRODUCT_SUCCESS = 'UNLIKE_PRODUCT_SUCCESS';
export const UNLIKE_PRODUCT_FAILURE = 'UNLIKE_PRODUCT_FAILURE';
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

export const likeProductRequest = () => ({
    type: LIKE_PRODUCT_REQUEST,
})
export const likeProductSuccess = (like) => ({
    type: LIKE_PRODUCT_SUCCESS,
    payload: like,
})
export const likeProductFailure = (error) => ({
    type: LIKE_PRODUCT_FAILURE,
    error
})

export const unlikeProductRequest = () => ({
    type: UNLIKE_PRODUCT_REQUEST,
})
export const unlikeProductSuccess = (id) => ({
    type: UNLIKE_PRODUCT_SUCCESS,
    payload: id,
})
export const unlikeProductFailure = (error) => ({
    type: UNLIKE_PRODUCT_FAILURE,
    error
})

export const likeProduct = (productId) => {
    return async (dispatch) => {
        dispatch(likeProductRequest());
        try {
            const response = await axios.post(`${HOST}/api/likes`, {
                UserId: 1, // Replace with actual user ID once authentication is implemented
                ProductId:productId,
            });
            dispatch(likeProductSuccess(response.data));
        } catch (error) {
            dispatch(likeProductFailure(error));
        }
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

export const unlikeProduct = (productId) => {
    return async(dispatch) => {
        dispatch(unlikeProductRequest());
        try{
            await axios.delete(`${HOST}/api/likes/${productId}`);
            dispatch(unlikeProductSuccess(productId));
        } catch(error){
            dispatch(unlikeProductFailure(error));
        }

    };
};