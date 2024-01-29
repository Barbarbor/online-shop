import {FC} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { ICategory } from '../../models/ICategory';
import { InputLabel, TextField } from '@mui/material';
import '../../styles/CategoryForm.scss';
interface CategoryFormProps {
    onSubmit: SubmitHandler<ICategory>;
}

const CategoryForm: FC<CategoryFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>();

    const onFormSubmit = (data: ICategory) => {
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