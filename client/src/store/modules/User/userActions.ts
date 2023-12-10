import { IUser } from './../../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import {HOST} from '../../../constants';
import axios from 'axios';
import {IUserLogin} from "./../../../models/IUser";
import {IUserRegister} from "./../../../models/IUser";
export const userLogin = async (loginData:IUserLogin) =>{
        try {
                const response = await axios.post(`${HOST}/auth/login`, loginData);
                const {user, token} = response.data;
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);

                return token;
        }
        catch (error:any){
                return {error:error};
        }
};
export const userRegister = async (registerData:IUserRegister) => {
        try{
                const response = await axios.post(`${HOST}/auth/register`,registerData);
                const user = response.data.user;
                return user;
        }
        catch(error:any){
                return {error:error};
        }
}