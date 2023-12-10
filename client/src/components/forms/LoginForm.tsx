import React from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import {InputLabel, TextField} from "@mui/material";
import {IUserLogin} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";


const LoginForm: React.FC = () => {
    const {register, handleSubmit } = useForm<IUserLogin>();

    const onSubmit: SubmitHandler<IUserLogin> = async (data:IUserLogin) => {
        const token = await userLogin(data);
        console.log(`token:${token}`);
        console.log(localStorage.getItem('token'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
            <InputLabel  className='login-form-email-label'>Email</InputLabel>
                <TextField
                    className='login-form-email-input'
                    size='small'
                    id="email"
                    type='email'
                    placeholder="vasya.pupkin@mail.ru"
                    {...register('email', { required: true })}
                />
            <InputLabel  className='login-form-password-label'>Password</InputLabel>
                <TextField
                    className='login-form-password-input'
                    size='small'
                    id='password'
                    placeholder=""
                    type='password'
                    {...register('password', { required: true })}
                    />


            <button type="submit" className='login-form-submit-button'>Login</button>
        </form>
    );
};

export default LoginForm;