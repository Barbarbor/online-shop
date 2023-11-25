import React, { useState,useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchedProducts } from '../../store/modules/Product/actions';

import '../../styles/Search.scss';

import {TextField,List,ListItem,ListItemButton,ListItemText,Divider,Container,Menu,MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// TODO: fix Search refresh display
function Search({defaultValue=''}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchResults = useSelector((state) => state.searchedProducts.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                // Clicked outside the search panel, hide the dropdown
                setShowDropdown(false);
            }
        };

        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);

        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleSearch = () => {
        dispatch(fetchSearchedProducts(searchQuery));
        navigate(`/search-results/${searchQuery}`);
    };
    const handleListItemClick = (product) => {
        setSearchQuery(product.name);
        handleCloseDropdown();
        handleInputChange({ target: { value: product.name } });
    };
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        dispatch(fetchSearchedProducts(query));
        setShowDropdown(query !== '');
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <Container className='search-panel'>

            <TextField fullWidth={true}
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery || defaultValue}

                    onChange={handleInputChange}
                    onSelect={() => setShowDropdown(searchQuery !== '')}
                    className='search-input'
                    variant='outlined'
                    size="small"
                    ref={inputRef}
            />
            <button
                onClick={handleSearch}
                className='search-button'
            >
                <SearchIcon htmlColor='white'/>

            </button>
            <List hidden={!showDropdown} className='search-results-list'>
                {searchResults.map((product) => (
                    <ListItem divider button
                              className='search-results-item'
                              onClick={() => handleListItemClick(product)}
                              key={product.id}
                    >
                        <ListItemText
                            primary={product.name}
                            className='search-results-text'/>
                    </ListItem>
                ))}
            </List>


        </Container>

    );
}

export default Search;