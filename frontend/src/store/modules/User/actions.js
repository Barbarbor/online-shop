import axios from "axios";
import {HOST} from "../../../constants";

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const DELETE_USERS_REQUEST = 'DELETE_USERS_REQUEST';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USERS_FAILURE = 'DELETE_USERS_FAILURE';


export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
});
export const fetchUsersSuccess = (users) => ({
    type:FETCH_USERS_SUCCESS,
    payload:users,
});
export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    error
});

export const addUserRequest = () => ({
    type:ADD_USER_REQUEST,
})
export const addUserSuccess = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user,
})
export const addUserFailure = (error) => ({
    type: ADD_USER_FAILURE,
    error,
})

export const deleteUserRequest = () => ({
    type: DELETE_USER_REQUEST,
})
export const deleteUserSuccess = (id) => ({
    type: DELETE_USER_SUCCESS,
    payload: id,
})
export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    error,
})

export const deleteUsersRequest = () => ({
    type: DELETE_USERS_REQUEST,
})
export const deleteUsersSuccess = (ids) => ({
    type: DELETE_USERS_SUCCESS,
    payload: ids,
})
export const deleteUsersFailure = (error) => ({
    type: DELETE_USERS_FAILURE,
    error,
})


export const fetchUsers = () => {
    return async(dispatch) => {
        dispatch(fetchUsersRequest());
        try {
            const response = await axios.get(`${HOST}/api/users`);
            dispatch(fetchUsersSuccess(response.data));
        } catch(error) {
            dispatch(fetchUsersFailure(error));
        }
    };
};

export const addUser = (userData) => {
    return async (dispatch) => {
        dispatch(addUserRequest());
        try {
            const response = await axios.post(`${HOST}/api/users`, userData);
            dispatch(addUserSuccess(response.data));
        } catch (error) {
            dispatch(fetchUsersFailure(error));
        }
    };
};

export const deleteUser = (userId) => {
    return async (dispatch) => {
        dispatch(deleteUserRequest());
        try {
            await axios.delete(`${HOST}/api/users/${userId}`);
            dispatch(deleteUserSuccess(userId));
        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    };
};

export const deleteUsers = (userIds) => {
    return async (dispatch) => {
        dispatch(deleteUsersRequest());
        try {
            await axios.delete(`${HOST}/api/users/multiple/delete-multiple`,{data:{userIds:userIds}});
            dispatch(deleteUsersSuccess(userIds));
        } catch (error) {
            dispatch(deleteUsersFailure(error));
        }
    };
};