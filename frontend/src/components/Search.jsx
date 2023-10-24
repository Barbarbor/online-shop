import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../store/actions/searchActions';
import { Form, ListGroup, Overlay, Popover } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const searchResults = useSelector((state) => state.search.results);
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [target, setTarget] = useState(null);
    const navigate = useNavigate();
    const handleSearch = () => {
        dispatch(searchProducts(searchQuery));
        navigate(`/search-results/${searchQuery}`);
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        dispatch(searchProducts(query));
        setShowDropdown(query !== ''); // Show the dropdown when the query is not empty
        setTarget(e.target);
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    id="search-input"
                />
            </Form.Group>
            {showDropdown && (
                <Overlay
                    show={showDropdown}
                    target={target}
                    placement="bottom"
                >
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                zIndex: 1000, // Make sure the dropdown is on top
                                position: 'absolute',
                                width: '100%', // Adjust the width as needed
                            }}
                        >
                            <ListGroup>
                                {searchResults.map((product) => (
                                    <ListGroup.Item
                                        key={product.id}
                                        onClick={() => {
                                            setSearchQuery(product.name);
                                            handleCloseDropdown();
                                        }}
                                        action
                                    >
                                        {product.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Overlay>
            )}
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;