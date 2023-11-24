import { IUser } from './../../../models/IUser';
import { AuthActionTypes, SetAuthActions, SetErrorAction, SetIsLoadingAction, SetUserAction } from "../../types/User";
import { AppDispatch } from '../../store';
import axios from 'axios';

export const AuthActionCreators = {
    setUser: (user: IUser) : SetUserAction => ({type: AuthActionTypes.SET_USER, payload: user}),
    setIsAuth: (auth: boolean) : SetAuthActions => ({type: AuthActionTypes.SET_AUTH, payload: auth}),
    setIsLoading: (loading: boolean) : SetIsLoadingAction => ({type: AuthActionTypes.SET_IS_LOADING, payload: loading}),
    setIsError: (error: string) : SetErrorAction => ({type: AuthActionTypes.SET_ERROR, payload: error}),
    login: (username: string, password: string) => async (dispacth: AppDispatch) => {
        try {
            dispacth(AuthActionCreators.setIsLoading(true));

            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./users.json');
                const fooUser = response.data.find(user => user.username === username && user.password === password)
                if (fooUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', fooUser.username);
                    dispacth(AuthActionCreators.setIsAuth(true));
                    dispacth(AuthActionCreators.setUser(fooUser));
                } else {
                    dispacth(AuthActionCreators.setIsError('Некорректный логин или пароль'));
                }
                dispacth(AuthActionCreators.setIsLoading(false));
            }, 1000)
            
        } catch (e) {
            dispacth(AuthActionCreators.setIsError('Произошла ошибка при логине :('));
        }
    },
    logout: () => async (dispacth: AppDispatch) => {
        try {
            localStorage.removeItem('auth');
            localStorage.removeItem('username');
            dispacth(AuthActionCreators.setUser({} as IUser));
            dispacth(AuthActionCreators.setIsAuth(false));

        } catch (e) {

        }
    }
 }