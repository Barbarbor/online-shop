import React, { useState,useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchedProducts } from '../store/modules/Product/actions';
import { useNavigate } from "react-router-dom";
import {TextField,List,ListItem,ListItemButton,ListItemText,Divider} from "@mui/material";
import { ReactSVG } from 'react-svg';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';
function Search({defaultValue=''}) {
    const [searchQuery, setSearchQuery] = useState('');
    const searchResults = useSelector((state) => state.searchedProducts.products);
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const iconSize = 28;

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
        setShowDropdown(query !== ''); // Show the dropdown when the query is not empty

    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className='search-panel'>
        <div className='search-results'>
            <TextField
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
        </div>
            <button
                onClick={handleSearch}
                className='search-button'
            >
            <SearchIcon htmlColor='white'/>

            </button>
        </div>

    );
}

export default Search;