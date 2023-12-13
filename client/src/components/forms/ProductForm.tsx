import React, { useState, ChangeEvent, SetStateAction, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { IProduct } from '../../models/IProduct';

import '../../styles/ProductForm.scss';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ICategory } from '../../models/ICategory';
import { ISubcategory } from '../../models/ISubcategory';

interface ProductFormProps {
    onSubmit: SubmitHandler<IProduct>;
    categories: { id: number; name: string }[];
    subcategories: { id: number; name: string }[];
    onSelectedCategory: (categoryId : number) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, categories, subcategories, onSelectedCategory}) => {
    const { register, handleSubmit, reset } = useForm<IProduct>();
    const [category, setCategory] = useState<number>();
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const handleFormSubmit: SubmitHandler<IProduct> = async (data) => {
        // For file uploads, ensure you handle them appropriately in the parent component
        if (photoUrl) {
            data.photography_url = photoUrl;
        }
        // const selectedCategoryId = data.categoryId;
        // onSelectedCategory(selectedCategoryId);
        // const selectedSubcategoryId = data.subcategoryId;
        // Submit data to the parent component
        console.log(`PHOTO URL: ${data.photography_url}`);
        onSubmit(data);

        // Reset the form after submission
        reset();
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // reader.result содержит содержимое файла в формате base64
                const base64String = reader.result as string;

                // Собираем URL изображения, добавляя его к конечной точке сервера
                const url = `http://localhost:3000/media/${file.name}`;

                // Устанавливаем сгенерированный URL в состояние
                setPhotoUrl(url);
            };

            // Читаем файл как Data URL
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className='product-form'>
            <InputLabel>Product Name</InputLabel>
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
                onChange={(e) => onSelectedCategory(Number(e.target.value))}
            >
                <MenuItem disabled={true} value="select_category"> Select Category</MenuItem>
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
                defaultValue={''}
                size='small'
                className='product-form-subcategory-select'
                {...register('SubcategoryId', { required: true })}>
                <MenuItem disabled={true} value="select_subcategory"> Select Subcategory</MenuItem>
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
            <InputLabel>Product photo</InputLabel>
            <input
                className='product-form-photo'
                type="file"
                accept="image/*"
                {...register('photography_url', { required: true })}
                onChange={handleFileChange}

            />
            <button type="submit" className='product-form-submit-button'>Add Product</button>
        </form>
    );
};

export default ProductForm;