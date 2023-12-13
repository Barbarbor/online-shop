import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { IProduct } from '../../models/IProduct';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {useNavigate, useParams} from 'react-router-dom';
import { fetchSearchedProducts } from '../../store/modules/Product/productActions';


import {TextField,List,ListItemButton,ListItemText,ListItem,Container} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/Search.scss';

interface SearchProps {
    defaultValue?: string | undefined;
}

const Search: FC<SearchProps> = ({defaultValue = ''}) => {

    const [searchQuery, setSearchQuery] = useState<string>(defaultValue);

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [productsSearched,setProductsSearched] = useState<IProduct[] >([]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
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
    }

    const handleListItemClick = (product: IProduct) => {
        setSearchQuery(product.name);
        handleInputChange({ target: { value: product.name } } as ChangeEvent<HTMLInputElement>);
        handleCloseDropdown();
      };

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        const products = await dispatch(fetchSearchedProducts(query,true));
        if(products) {
            setProductsSearched(products);
        }
        setShowDropdown(query !== '');
    }

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <Container className='search-panel'>

            <TextField
                       type="text"
                       placeholder="Search for products..."
                       value={searchQuery}
                       defaultValue={defaultValue}
                       onChange={handleInputChange}
                       onSelect={() => setShowDropdown(searchQuery !== '')}
                       className='search-input'
                       variant='outlined'
                       size="small"
                       ref={inputRef}
                       InputProps={{
                           className: 'search-field-input-props'

                       }}
            />
            <button
                onClick={handleSearch}
                className='search-button'
            >
                <SearchIcon htmlColor='white'/>

            </button>
            <List hidden={!showDropdown} className='search-results-list'>
                {productsSearched.map((product) => (
                    <ListItem divider button
                              className='search-results-item'
                              onClick={() => handleListItemClick(product)}
                              key={product.id}
                    >
                        <ListItemText
                            primary={product.name}
                            primaryTypographyProps={{
                            className:'search-results-text'
                        }}
                        />

                    </ListItem>
                ))}
            </List>


        </Container>
      );
}

export default Search;