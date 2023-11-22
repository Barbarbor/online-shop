import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/CategoryForm.scss';
import {TextField,Input,InputLabel} from "@mui/material";
const CategoryForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        // Pass the form data to the parent component's onSubmit function
        onSubmit(data);
    };

    return (
        <form className='category-form' onSubmit={handleSubmit(onFormSubmit)}>
            <div className="category-form-name">
                <InputLabel  className='category-form-name-label'>Category Name</InputLabel>
                <TextField
                    className='category-form-name-input'
                    size='small'
                    id="name"
                    placeholder="Electronics"
                    {...register('name', { required: true })}
                />

            </div>

            <button className='category-form-submit' type="submit">Submit</button>
        </form>
    );
};

export default CategoryForm;