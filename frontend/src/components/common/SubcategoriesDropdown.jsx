import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/actions';

import '../../styles/Categories.scss';

import {Menu,MenuItem,Divider,Container} from "@mui/material";

function SubcategoriesDropdown({ categoryId, isOpen,anchorEl}) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subcategories = useSelector( (state) => state.subcategory.subcategories);


    const handleSubcategoryClick = (subcategoryId) => {
        if (subcategoryId) {
            navigate(`/category/${subcategoryId}`);
        }
    };

    return (

        <Menu className="subcategories-menu" open={isOpen}
                anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
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
