import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, categories = [], subcategories = [],  }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = async (data) => {
        data.CategoryId = parseInt(data.CategoryId);
        data.SubcategoryId = parseInt(data.SubcategoryId);



        onSubmit(data);

        reset();
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
                type="text"
                placeholder="Product Name"
                {...register('name', { required: true })}
            />

            <textarea
                placeholder="Product Description"
                {...register('description', { required: true })}
            />

            <input
                type="number"
                placeholder="Product Price"
                {...register('price', { required: true, valueAsNumber: true })}
            />

            <input
                type="file"
                accept="image/*"
                {...register('productImage', { required: true })}
            />

            <select  {...register('CategoryId', { required: true })}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option  key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select  {...register('SubcategoryId', { required: true })}>
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                    </option>
                ))}
            </select>

            <button type="submit">Add Product</button>
        </form>

    );
};

export default ProductForm;
