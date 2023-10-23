import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap"; // Import Dropdown from react-bootstrap
import { connect } from 'react-redux';
import { fetchSubcategories } from '../store/actions/categoryActions';
import { ReactSVG } from 'react-svg';
import { HOST } from "../constants";
import { useNavigate } from 'react-router-dom';

function SubcategoriesDropdown({ categoryId, subcategories, fetchSubcategories }) {
    useEffect(() => {
        if (!subcategories || subcategories.length === 0) {
            fetchSubcategories(categoryId);
        }
    }, [categoryId, subcategories, fetchSubcategories]);
    const navigate = useNavigate();

    const handleSubcategoryClick = (subcategoryId) => {
        // Redirect to the subcategory products page
        if(subcategoryId) {
            navigate(`/category/${subcategoryId}`);
        }
    };
    return (
        <Dropdown.Menu className="subcategories-dropdown">
            {subcategories.map((subcategory) => (
                <Dropdown.Item key={subcategory.id}   onClick={() => handleSubcategoryClick(subcategory.id)} >
                    {subcategory.name}
                </Dropdown.Item>

            ))}

        </Dropdown.Menu>
    );
}

const mapStateToProps = (state) => ({
    subcategories: state.category.subcategories,
});

export default connect(mapStateToProps, { fetchSubcategories })(SubcategoriesDropdown);
