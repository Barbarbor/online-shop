import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
} from '../actions';

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case DELETE_USER_REQUEST:
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case DELETE_USER_SUCCESS:
            // Remove the deleted user from the state
            const updatedUsers = state.users.filter((user) => user.id !== action.payload);
            return {
                ...state,
                loading: false,
                users: updatedUsers,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload],
            };
        case FETCH_USERS_FAILURE:
        case DELETE_USER_FAILURE:
        case ADD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default userManagementReducer;