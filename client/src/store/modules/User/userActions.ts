import { IUser } from './../../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import {HOST} from '../../../constants';
import axios, {AxiosError} from 'axios';
import {IUserLogin} from "./../../../models/IUser";
import {IUserRegister} from "./../../../models/IUser";
export const userLogin = async (loginData:IUserLogin) =>{
        try {
                const response = await axios.post(`${HOST}/auth/login`, loginData);
                const {user, token} = response.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);
                window.location.reload();
                return token;
        }
        catch (error:any){
                alert("Error!");
                return {error:error};
        }
};
export const userRegister = async (registerData:IUserRegister) => {
        try{
                const response = await axios.post(`${HOST}/auth/register`,registerData);
                const user = response.data.user;
                alert("Registered!");
                return user;
        }
        catch(error:any){
                alert("Error while register. Try again!");
                return {error:error};
        }
};
export  const userLogout = async() =>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
}
export const userTokenVerify = async(token:string | null) =>{

        if (token) {
                try {
                        // Отправляем запрос к защищенному ресурсу с токеном в заголовке
                        const response = await axios.get(`${HOST}/auth/verify`, {
                                headers: {
                                        Authorization: token,
                                },
                        });
                        return response.data.user;
                }
                catch(error:any){
                        console.log(`Error: ${error}`);
                        return null;
                }
        } else {
                console.log('Токен отсутствует');
                return null;

        }
}