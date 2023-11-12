import React, {useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategoriesOfCategory } from '../store/modules/Subcategory/actions';
import { useNavigate } from 'react-router-dom';
import {Menu,MenuItem,Divider,Container} from "@mui/material";
import './Categories.scss';
function SubcategoriesDropdown({ categoryId, isOpen,anchorEl }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subcategories = useSelector( (state) => state.subcategory.subcategories);
    const [selectedIndex, setSelectedIndex] = useState(null);
    useEffect(() => {
        dispatch(fetchSubcategoriesOfCategory(categoryId));
    }, []);
    const handleSubcategoryClick = (subcategoryId) => {
        if (subcategoryId) {
            navigate(`/category/${subcategoryId}`);
        }
    };

    return (

        <Menu   className="subcategories-menu" open={isOpen}
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
