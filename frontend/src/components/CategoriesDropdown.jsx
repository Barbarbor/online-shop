import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/modules/Category/actions';
import { fetchSubcategoriesOfCategory } from '../store/modules/Subcategory/actions';
import SubcategoriesDropdown from "./SubcategoriesDropdown";
import { ReactSVG } from 'react-svg';
import CategoriesIcon from '../assets/icons/categories-icon.svg';
import { Link } from 'react-router-dom';

function CategoriesDropdown() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const subcategories = useSelector((state) => state.subcategory.subcategories)
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories, dispatch]);

    const handleCategoryClick = (categoryId) => {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
        } else {
            setSelectedCategoryId(categoryId);
            dispatch(fetchSubcategoriesOfCategory(categoryId));
        }

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
                            <SubcategoriesDropdown categoryId={category.id} subcategories={subcategories} />
                        </Dropdown.Menu>
                    </Dropdown>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default CategoriesDropdown;