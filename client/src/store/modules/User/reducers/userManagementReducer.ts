import { IUser } from "../../../../models/IUser";
import { AuthAction, AuthActionTypes, AuthState } from "../../../types/User";

const initialState: AuthState = {
    isAuth: false,
    isError: null,
    isLoading: false,
    user: {} as IUser
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false }
        case AuthActionTypes.SET_USER:
            return {...state, user: action.payload }
        case AuthActionTypes.SET_IS_LOADING:
            return {...state, isLoading: action.payload }
        case AuthActionTypes.SET_ERROR:
            return {...state, isError: action.payload, isLoading: false}
        default:
            return state;
    }
}