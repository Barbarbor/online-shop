import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/UserForm.scss';
import {TextField,Select,MenuItem,InputLabel} from '@mui/material';
const UserForm = ({ addUser }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        addUser(data);
        reset(); // Reset the form fields after submission
    };

    return (
        <form className='user-form' onSubmit={handleSubmit(onSubmit)}>
            <InputLabel>Username</InputLabel>
            <TextField
                size='small'
                className='user-form-username'
                type="text"
                placeholder="Username"
                {...register('username')}  />
            <InputLabel>Email</InputLabel>
            <TextField
                size='small'
                className='user-form-email'
                type="email"
                placeholder="Email"
                {...register('email')}  />
            <InputLabel>Password</InputLabel>
            <TextField
                size='small'
                className='user-form-password'
                type="password"
                placeholder="Password"
                {...register('password')} />
            <button className='user-form-submit-button' type="submit">Add User</button>
        </form>
    );
};

export default UserForm;