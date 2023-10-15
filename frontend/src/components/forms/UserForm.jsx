import React from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ addUser }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        addUser(data);
        reset(); // Reset the form fields after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} type="text" placeholder="Username" />
            <input {...register('email')} type="email" placeholder="Email" />
            <input {...register('password')} type="password" placeholder="Password" />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;