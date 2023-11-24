import { IUser } from "../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    isError: null | string;
}

export enum AuthActionTypes {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR"
}

export interface SetAuthActions {
    type: AuthActionTypes.SET_AUTH;
    payload: boolean;
}

export interface SetErrorAction {
    type: AuthActionTypes.SET_ERROR;
    payload: string;
}

export interface SetUserAction {
    type: AuthActionTypes.SET_USER;
    payload: IUser;
}

export interface SetIsLoadingAction {
    type: AuthActionTypes.SET_IS_LOADING;
    payload: boolean;
}

export type AuthAction = SetAuthActions
                       | SetErrorAction 
                       | SetIsLoadingAction 
                       | SetUserAction;