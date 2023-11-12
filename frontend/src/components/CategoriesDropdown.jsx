import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/modules/Category/actions';
import { fetchSubcategoriesOfCategory } from '../store/modules/Subcategory/actions';
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import { ReactSVG } from 'react-svg';
import CategoriesIcon from '../assets/icons/categories-icon.svg';
import { Link } from 'react-router-dom';
import {Drawer, List, ListItem, ListItemText,Container} from "@mui/material";
import './Categories.scss';
function CategoriesDropdown() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [target,setTarget] = useState(null);
    const subcategories = useSelector((state) => state.subcategory.subcategories)
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
            setTarget(e.target);
            dispatch(fetchSubcategoriesOfCategory(categoryId));
        }

    };
    const handleToggleDrawer = () =>{
        setShowDrawer(!showDrawer);
    };
    return (

                <div>
                    <ReactSVG
                        src={CategoriesIcon}
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', 24);
                            svg.setAttribute('height', 24);
                        }}
                        className="nav-icon"
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
                                    {category.id === selectedCategoryId ? (
                                        <ListItemText className='categories-list-item-text' sx={{color:'blue'}}  >{category.name}</ListItemText>
                                    ):(
                                        <ListItemText className='categories-list-item-text'  >{category.name}</ListItemText>) }

                                    <SubcategoriesDropdown categoryId={category.id} isOpen={selectedCategoryId === category.id}   />   </ListItem>
                            ))}
                        </List>

                    </Drawer>
                </div>

    );
}

export default CategoriesDropdown;