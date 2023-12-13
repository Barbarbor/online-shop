import React from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import {InputLabel, TextField} from "@mui/material";
import {IUserRegister} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";
import {userRegister} from "../../store/modules/User/userActions";
import '../../styles/RegisterForm.scss';
const RegisterForm: React.FC = () => {
    const {register, handleSubmit } = useForm<IUserRegister>();

    const onSubmit: SubmitHandler<IUserRegister> = async (data:IUserRegister) => {
        const user = await userRegister(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
            <InputLabel  className='register-form-email-label'>Email</InputLabel>
            <TextField
                className='register-form-email-input'
                size='small'
                id="email"
                type='email'
                placeholder="vasya.pupkin@mail.ru"
                {...register('email', { required: true })}
            />

            <InputLabel  className='register-form-username-label'>Username</InputLabel>
            <TextField
                className='register-form-username-input'
                size='small'
                id='username'
                placeholder="Vasya_Pupkin"
                {...register('username', { required: true })}
            />
            <InputLabel  className='register-form-paswword-label'>Password</InputLabel>
            <TextField
                className='register-form-password-input'
                size='small'
                id='password'
                placeholder=""
                type='password'
                {...register('password', { required: true })}
            />
            <button type="submit" className='register-form-submit-button'>Register</button>
        </form>
    );
};

export default RegisterForm;