import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/ProductForm.scss';
import {TextField,InputLabel,Select,MenuItem,Input} from '@mui/material';
const ProductForm = ({ onSubmit, categories = [], subcategories = [],onSelectedCategory  }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = async (data) => {
        data.CategoryId = parseInt(data.CategoryId);
        data.SubcategoryId = parseInt(data.SubcategoryId);

        onSubmit(data);

        reset();

    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className='product-form'>
            <InputLabel>Product Name </InputLabel>
            <TextField

                className='product-form-name'
                type="text"
                placeholder="Iphone14"
                size='small'
                {...register('name', { required: true })}
            />
            <InputLabel>Product Price</InputLabel>
            <TextField
                className='product-form-price'
                type="number"
                placeholder="15000"
                size='small'
                {...register('price', { required: true, valueAsNumber: true })}
            />


            <InputLabel>Category</InputLabel>
            <Select
                defaultValue={0}
                size='small'
                className='product-form-category-select'
                {...register('CategoryId', { required: true })}
                onChange={(e) => onSelectedCategory(e.target.value)}
            >

                <MenuItem disabled={true} value={0}> Select Category</MenuItem>
                {categories.map((category) => (
                    <MenuItem
                        className='product-form-category-select-option'
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel> Subcategory</InputLabel>
            <Select
                defaultValue={0}
                size='small'
                className='product-form-subcategory-select'
                {...register('SubcategoryId', { required: true })}>
                <MenuItem disabled={true} value={0 }> Select Subcategory</MenuItem>
                {subcategories.map((subcategory) => (

                    <MenuItem
                        className='product-form-subcategory-select-option'
                        key={subcategory.id}
                        value={subcategory.id}>
                        {subcategory.name}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel>Product description</InputLabel>
            <TextField
                multiline={true}
                className='product-form-description'
                placeholder="Iphone 14. Some desc"
                size='small'
                {...register('description', { required: true })}
            />
            <input
                className='product-form-photo'
                type="file"
                accept="image/*"
                {...register('productImage', { required: true })}
            />
            <button type="submit" className='product-form-submit-button'>Add Product</button>
        </form>

    );
};

export default ProductForm;
