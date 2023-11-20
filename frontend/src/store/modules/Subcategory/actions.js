import axios from "axios";
import {HOST} from "../../../constants";


export const FETCH_SUBCATEGORIES_OF_CATEGORY_REQUEST = 'FETCH_SUBCATEGORIES_OF_CATEGORY_REQUEST';
export const FETCH_SUBCATEGORIES_OF_CATEGORY_SUCCESS = 'FETCH_SUBCATEGORIES_OF_CATEGORY_SUCCESS';
export const FETCH_SUBCATEGORIES_OF_CATEGORY_FAILURE = 'FETCH_SUBCATEGORIES_OF_CATEGORY_FAILURE';


export const FETCH_ALL_SUBCATEGORIES_REQUEST = 'FETCH_ALL_SUBCATEGORIES_REQUEST';
export const FETCH_ALL_SUBCATEGORIES_SUCCESS = 'FETCH_ALL_SUBCATEGORIES_SUCCESS';
export const FETCH_ALL_SUBCATEGORIES_FAILURE = 'FETCH_ALL_SUBCATEGORIES_FAILURE';


export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';


export const DELETE_SUBCATEGORY_REQUEST ='DELETE_SUBCATEGORY_REQUEST';
export const DELETE_SUBCATEGORY_SUCCESS ='DELETE_SUBCATEGORY_SUCCESS';
export const DELETE_SUBCATEGORY_FAILURE ='DELETE_SUBCATEGORY_FAILURE';

export const DELETE_SUBCATEGORIES_REQUEST ='DELETE_SUBCATEGORIES_REQUEST';
export const DELETE_SUBCATEGORIES_SUCCESS ='DELETE_SUBCATEGORIES_SUCCESS';
export const DELETE_SUBCATEGORIES_FAILURE ='DELETE_SUBCATEGORIES_FAILURE';


export const fetchSubcategoriesOfCategoryRequest = () => ({
    type:FETCH_SUBCATEGORIES_OF_CATEGORY_REQUEST,
});
export const fetchSubcategoriesOfCategorySuccess = (subcategories) => ({
    type:FETCH_SUBCATEGORIES_OF_CATEGORY_SUCCESS,
    payload:subcategories,
});
export const fetchSubcategoriesOfCategoryFailure = (error) => ({
    type:FETCH_SUBCATEGORIES_OF_CATEGORY_FAILURE,
    error,
});


export const fetchAllSubcategoriesRequest = () => ({
    type:FETCH_ALL_SUBCATEGORIES_REQUEST,
});
export const fetchAllSubcategoriesSuccess = (subcategories) => ({
    type:FETCH_ALL_SUBCATEGORIES_SUCCESS,
    payload:subcategories,
});
export const fetchAllSubcategoriesFailure = (error) => ({
    type:FETCH_ALL_SUBCATEGORIES_FAILURE,
    error,
});


export const addSubcategoryRequest = () => ({
    type:ADD_SUBCATEGORY_REQUEST,
});
export const addSubcategorySuccess = (newSubcategory) => ({
    type:ADD_SUBCATEGORY_REQUEST,
    payload:newSubcategory,
});
export const addSubcategoryFailure = (error) => ({
    type:ADD_SUBCATEGORY_REQUEST,
    error,
});


export const deleteSubcategoryRequest = () => ({
    type: DELETE_SUBCATEGORY_REQUEST,
});
export const deleteSubcategorySuccess = (subcategoryId) => ({
    type: DELETE_SUBCATEGORY_SUCCESS,
    payload:subcategoryId,
});
export const deleteSubcategoryFailure = (error) => ({
    type: DELETE_SUBCATEGORY_FAILURE,
    error,
});

export const deleteSubcategoriesRequest = () => ({
    type: DELETE_SUBCATEGORIES_REQUEST,
});
export const deleteSubcategoriesSuccess = (Ids) => ({
    type: DELETE_SUBCATEGORIES_SUCCESS,
    payload:Ids,
});
export const deleteSubcategoriesFailure = (error) => ({
    type: DELETE_SUBCATEGORIES_FAILURE,
    error,
});

export const fetchSubcategoriesOfCategory = (categoryId) => {
    return async (dispatch) => {
        dispatch(fetchSubcategoriesOfCategoryRequest());
        try{
            const response = await axios.get(`${HOST}/api/categories/${categoryId}/subcategories`);
            dispatch(fetchSubcategoriesOfCategorySuccess(response.data));
        }
        catch(error){
            dispatch(fetchSubcategoriesOfCategoryFailure(error));
        };

    };
};

export const fetchAllSubcategories = () => {
    return async (dispatch) => {
        dispatch(fetchAllSubcategoriesRequest());
        try {
            const response = await axios.get(`${HOST}/api/subcategories`);
            dispatch(fetchAllSubcategoriesSuccess(response.data));
        } catch (error) {
            dispatch(fetchAllSubcategoriesFailure(error));
        }
    };
};

export const addSubcategory = (newSubcategory) => {
    return async (dispatch) => {
        dispatch(addSubcategoryRequest());
        try {
            const response = await axios.post(`${HOST}/api/subcategories`, {
                name: newSubcategory.name,
                CategoryId: +newSubcategory.CategoryId,
            });
            dispatch(addSubcategorySuccess(response.data));
        } catch (error) {
            dispatch(addSubcategoryFailure(error));
        }
    };
};

export const deleteSubcategory = (subcategoryId) => {
    return async(dispatch) => {
        dispatch(deleteSubcategoryRequest());
        try{
            await axios.delete(`${HOST}/api/subcategories/${subcategoryId}`);
            dispatch(deleteSubcategorySuccess(subcategoryId));
        } catch (error){
            dispatch(deleteSubcategoryFailure(error));
        }


    };
};

export const deleteSubcategories = (subcategoryIds) => {
    return async(dispatch) => {
        dispatch(deleteSubcategoriesRequest());
        try{
            await axios.delete(`${HOST}/api/subcategories/multiple/delete-multiple`,{data:{subcategoryIds:subcategoryIds}});
            dispatch(deleteSubcategoriesSuccess(subcategoryIds));
        } catch (error){
            dispatch(deleteSubcategoriesFailure(error));
        }


    };
};