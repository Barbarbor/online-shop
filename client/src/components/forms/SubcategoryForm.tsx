import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import '../../styles/SubcategoryForm.scss';
import { InputLabel, TextField, Select, MenuItem } from '@mui/material';
import { ISubcategory } from '../../models/ISubcategory';

interface SubcategoryFormProps {
    onSubmit: (data: ISubcategory) => void;
    categories: { id: number; name: string }[];
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({ onSubmit, categories }) => {
    const { register, handleSubmit, reset } = useForm<ISubcategory>();

    const handleFormSubmit: SubmitHandler<ISubcategory> = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <form className='subcategory-form' onSubmit={handleSubmit(handleFormSubmit)}>
            <InputLabel>Subcategory Name</InputLabel>
            <TextField
                className='subcategory-form-name'
                type="text"
                placeholder="Phones"
                {...register('name', { required: true })}
                />
            <InputLabel>Category</InputLabel>
            <Select
                defaultValue={'select_category'}
                className='subcategory-form-select'
                {...register('CategoryId', { required: true })}>
                <MenuItem disabled={true} value="select_category"> Select subategory</MenuItem>
                {categories.map((category) => (
                    <MenuItem
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