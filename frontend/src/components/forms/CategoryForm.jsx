import React from 'react';
import { useForm } from 'react-hook-form';

const CategoryForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        // Pass the form data to the parent component's onSubmit function
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: true })}
                />
                {errors.name && <p className="error">Category name is required</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CategoryForm;