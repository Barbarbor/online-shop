import React, { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom';
import { fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/subcategoryActions';

import { Menu, MenuItem } from '@mui/material';
import '../../styles/Categories.scss';

interface SubcategoriesDropdownProps {
    categoryId: number;
    isOpen: boolean;
}

const SubcategoriesDropdown : FC<SubcategoriesDropdownProps> = ({categoryId, isOpen}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {subcategories} = useAppSelector(state => state.subcategoryManagementReducer);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        dispatch(fetchSubcategoriesOfCategory(categoryId));
    }, [dispatch]);
    
    const handleSubcategoryClick = (subcategoryId : number) => {
        if (subcategoryId) {
            navigate(`/category/${subcategoryId}`)
        }
    }

    return (

        <Menu 
            className="subcategories-menu" open={isOpen}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 10, left: 585 }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            disableAutoFocusItem
            transitionDuration={0}
        >


            {subcategories.map((subcategory) => (

                <MenuItem
                    className='subcategories-menu-item'
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                    {subcategory.name}
                </MenuItem>
            ))}

        </Menu>
    );
}

export default SubcategoriesDropdown;