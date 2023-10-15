// SubcategoryForm.js

import React from 'react';
import { useForm } from 'react-hook-form';

const SubcategoryForm = ({ onSubmit, categories }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = (data) => {
        data.CategoryId = parseInt(data.CategoryId);
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input type="text" {...register('name', { required: true })} placeholder="Subcategory Name" />
            <select {...register('CategoryId', { required: true })}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit">Add Subcategory</button>
        </form>
    );
};

export default SubcategoryForm;
