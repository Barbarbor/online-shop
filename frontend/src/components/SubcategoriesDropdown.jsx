import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategoriesOfCategory } from '../store/modules/Subcategory/actions';
import { useNavigate } from 'react-router-dom';

function SubcategoriesDropdown({ categoryId,subcategories }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleSubcategoryClick = (subcategoryId) => {
        if (subcategoryId) {
            navigate(`/category/${subcategoryId}`);
        }
    };

    return (
        <Dropdown.Menu className="subcategories-dropdown">


            {subcategories.map((subcategory) => (

                <Dropdown.Item
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                >
                    {subcategory.name}
                </Dropdown.Item>
            ))}

        </Dropdown.Menu>


    );
}

export default SubcategoriesDropdown;
