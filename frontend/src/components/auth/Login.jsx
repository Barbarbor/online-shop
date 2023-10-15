import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {HOST} from '../../constants';
import LoginForm from "../forms/LoginForm";
const Login = ({ onLogin }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${HOST}/auth/login`, data); // Use the correct authentication endpoint
            const { token } = response.data;
            onLogin(token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <LoginForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
