import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import { fetchCategories, fetchSubcategories } from '../store/actions/categoryActions';
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import { HOST } from "../constants";

function CategoriesDropdown({ categories, fetchCategories, fetchSubcategories }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        // Fetch categories initially
        fetchCategories();
    }, [fetchCategories]);

    const handleCategoryClick = (categoryId) => {
        // Fetch subcategories for the clicked category
        setSelectedCategoryId(categoryId);
        fetchSubcategories(categoryId);
    };

    return (
        <NavDropdown title="Product Categories" id="category-dropdown">
            {categories.map((category) => (
                <NavDropdown.Item
                    key={category.id}
                    href={`#category/${category.id}`}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    {category.name}
                    {selectedCategoryId === category.id && (
                        <SubcategoriesDropdown categoryId={category.id} />
                    )}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, { fetchCategories, fetchSubcategories })(CategoriesDropdown);