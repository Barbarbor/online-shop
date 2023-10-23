import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { connect, } from 'react-redux';
import { fetchCategories, fetchSubcategories } from '../store/actions/categoryActions';
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import { ReactSVG } from 'react-svg';
import CategoriesIcon from '../assets/icons/categories-icon.svg';
import { Link } from 'react-router-dom';
function CategoriesDropdown({ categories, fetchCategories, fetchSubcategories }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [cachedSubcategories, setCachedSubcategories] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories, fetchCategories]);
    const handleCategoryClick = (categoryId) => {

        console.log('Category clicked:', categoryId);
        if (selectedCategoryId === categoryId) {
            // Toggle: If the same category is clicked again, close the subcategory list
            setSelectedCategoryId(null);
        } else {
            setSelectedCategoryId(categoryId);
        }
        fetchSubcategories(categoryId);
        setShowDropdown(true);
    };
    return (
        <Dropdown as="span" className="nav-dropdown">
            <Dropdown.Toggle as="span" id="category-dropdown">
                <div>
                    <ReactSVG
                        src={CategoriesIcon}
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', 24);
                            svg.setAttribute('height', 24);
                        }}
                        className="nav-icon"
                    />
                    <div>Categories</div>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu show={showDropdown}>
                {categories.map((category) => (
                    <Dropdown key={category.id} show={category.id === selectedCategoryId}>
                        <Dropdown.Toggle as="span" id={`category-${category.id}`} className="category-item" onClick={() => handleCategoryClick(category.id)}>

                                {category.name}

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <SubcategoriesDropdown categoryId={category.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                ))}
                
            </Dropdown.Menu>
        </Dropdown>
    );
}

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, { fetchCategories, fetchSubcategories })(CategoriesDropdown);