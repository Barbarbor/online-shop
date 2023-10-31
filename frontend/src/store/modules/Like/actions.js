import {HOST} from '../../../constants';
import axios from 'axios';


export const LIKE_PRODUCT_REQUEST = 'LIKE_PRODUCT_REQUEST';
export const LIKE_PRODUCT_SUCCESS = 'LIKE_PRODUCT_SUCCESS';
export const LIKE_PRODUCT_FAILURE = 'LIKE_PRODUCT_FAILURE';

export const UNLIKE_PRODUCT_REQUEST = 'UNLIKE_PRODUCT_REQUEST';
export const UNLIKE_PRODUCT_SUCCESS = 'UNLIKE_PRODUCT_SUCCESS';
export const UNLIKE_PRODUCT_FAILURE = 'UNLIKE_PRODUCT_FAILURE';

export const likeProductRequest = () => ({
    type: LIKE_PRODUCT_REQUEST,
})
export const likeProductSuccess = () => ({
    type: LIKE_PRODUCT_SUCCESS,

})
export const likeProductFailure = (error) => ({
    type: LIKE_PRODUCT_FAILURE,
    error
})

export const unlikeProductRequest = () => ({
    type: UNLIKE_PRODUCT_REQUEST,
})
export const unlikeProductSuccess = () => ({
    type: UNLIKE_PRODUCT_SUCCESS,

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
            dispatch(likeProductSuccess());
        } catch (error) {
            dispatch(likeProductFailure(error));
        }
    };
};

export const unlikeProduct = (productId) => {
    return async(dispatch) => {
        dispatch(unlikeProductRequest());
        try{
            await axios.delete(`${HOST}/api/likes/${productId}`);
            dispatch(unlikeProductSuccess());
        } catch(error){
            dispatch(unlikeProductFailure(error));
        }

    };
};