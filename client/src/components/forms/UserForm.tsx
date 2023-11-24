import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUser } from '../../models/IUser';

interface UserFormProps {
    addUser: (data: IUser) => void;
}

const UserForm: React.FC<UserFormProps> = ({ addUser }) => {
    const { register, handleSubmit, reset } = useForm<IUser>();

    const onSubmit: SubmitHandler<IUser> = (data) => {
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