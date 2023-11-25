import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/modules/Category/actions';
import { fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/actions';

import SubcategoriesDropdown from "./SubcategoriesDropdown";

import '../../styles/Categories.scss';

import {Drawer, List, ListItem, ListItemText,Container} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function CategoriesDropdown() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const subcategories = useSelector((state) => state.subcategory.subcategories)
    const [anchorEl,setAnchorEl] = useState(null);
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories, dispatch]);

    const handleCategoryClick = (e,categoryId) => {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);

        } else {
            setSelectedCategoryId(categoryId);
            setAnchorEl(e.target);
            dispatch(fetchSubcategoriesOfCategory(categoryId));
        }

    };
    const handleToggleDrawer = () =>{
        setShowDrawer(!showDrawer);
    };
    return (

                <div>
                    <MenuIcon
                        onClick={handleToggleDrawer}
                    />

                    <Drawer
                        anchor={'left'}
                        open={showDrawer}
                        onClose={handleToggleDrawer}
                        className='categories-drawer'
                        elevation={16}
                        >
                        <List className='categories-list'>
                            {categories.map((category) => (
                                <ListItem
                                    className='categories-list-item'
                                    onClick={(e) => handleCategoryClick(e,category.id)}
                                >
                                    {category.id === selectedCategoryId ?
                                        (
                                        <ListItemText className='categories-list-item-text' sx={{color:'blue'}}  >{category.name}</ListItemText>
                                        ) :
                                        (
                                        <ListItemText className='categories-list-item-text'  >{category.name}</ListItemText>
                                        ) }
                                    <SubcategoriesDropdown categoryId={category.id} isOpen={selectedCategoryId === category.id} anchorEl={anchorEl}  />   </ListItem>
                            ))}
                        </List>

                    </Drawer>
                </div>

    );
}

export default CategoriesDropdown;