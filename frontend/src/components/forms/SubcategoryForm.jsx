// SubcategoryForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/SubcategoryForm.scss';
import {TextField,Select,MenuItem,InputLabel} from '@mui/material';
const SubcategoryForm = ({ onSubmit, categories }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = (data) => {
        data.CategoryId = parseInt(data.CategoryId);
        onSubmit(data);
        reset();
    };

    return (
        <form className='subcategory-form' onSubmit={handleSubmit(handleFormSubmit)}>
            <InputLabel>Subcategory Name</InputLabel>
            <TextField
                size='small'
                className='subcategory-form-name'
                type="text"
                placeholder="Phones"
                {...register('name', { required: true })}
                />
            <InputLabel>Category</InputLabel>
            <Select
                size='small'
                defaultValue={'select_category'}
                className='subcategory-form-select'
                {...register('CategoryId', { required: true })}>
                <MenuItem disabled={true} value={'select_category'}>Select category</MenuItem>
                {categories.map((category) => (
                    <MenuItem
                        size='small'
                        className='subcategory-form-select-option'
                        key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
            <button className='subcategory-form-submit-button' type="submit">Add Subcategory</button>
        </form>
    );
};

export default SubcategoryForm;
