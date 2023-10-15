import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { connect } from 'react-redux'; // Import connect
import { fetchSubcategories } from '../store/actions/categoryActions'; // Import your Redux action
import { HOST } from "../constants";

function SubcategoriesDropdown({ categoryId, subcategories, fetchSubcategories }) {
    useEffect(() => {
        // Fetch subcategories for the current category using Redux action
        if (!subcategories || subcategories.length === 0) {
            fetchSubcategories(categoryId);
        }
    }, [categoryId, subcategories, fetchSubcategories]);

    return (
        <div>
            {subcategories.map((subcategory) => (
                <NavDropdown.Item key={subcategory.id} href={`#subcategory/${subcategory.id}`}>
                    {subcategory.name}
                </NavDropdown.Item>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    subcategories: state.category.subcategories, // Access subcategories from Redux store
});

export default connect(mapStateToProps, { fetchSubcategories })(SubcategoriesDropdown);