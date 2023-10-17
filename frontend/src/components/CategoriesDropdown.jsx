import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import { fetchCategories, fetchSubcategories } from '../store/actions/categoryActions';
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import { HOST } from "../constants";
import { ReactSVG } from 'react-svg'; // Import ReactSVG
import CategoriesIcon from '../assets/icons/categories-icon.svg'; // Your Categories icon

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
        <NavDropdown title={
            <div>
                <ReactSVG
                    src={CategoriesIcon}
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', 24);
                        svg.setAttribute('height', 24);
                    }}
                    className="nav-icon"
                />
                <div>Categories</div> {/* Add your label here */}
            </div>
        } id="category-dropdown" >
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
