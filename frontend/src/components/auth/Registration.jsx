import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {HOST} from '../../constants';
import RegistrationForm from "../forms/RegistrationForm";
const Registration = ({ onRegister }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${HOST}/auth/register`, data); // Use the correct registration endpoint
            const { token } = response.data;
            onRegister(token);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <RegistrationForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
        </div>
    );
};

export default Registration;
