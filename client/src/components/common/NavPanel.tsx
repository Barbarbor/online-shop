import React, { FC } from "react";
import { Link } from 'react-router-dom';

import CategoriesDropdown from "./CategoriesDropdown";

import { AppBar, List, ListItem, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../styles/NavPanel.scss';

const NavPanel : FC = () => {

    return (
        <AppBar className='nav-panel'>
            <List className='nav-panel-list'>
                <Link to={'/'} className='link-style'>
                    <ListItem className='nav-panel-item nav-panel-item-left'>
                        <HomeIcon
                        />
                        <ListItemText className='nav-panel-item-text-icon' >Home</ListItemText>

                    </ListItem>
                </Link>
             <ListItem id='categories-icon' className='nav-panel-item nav-panel-item-left'>
                <CategoriesDropdown />
                <ListItemText className='item-text-icon'>Categories</ListItemText>
            </ListItem>

                <Link to={'/cart'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right' >
                            <ShoppingCartIcon
                            />
                            <ListItemText className='item-text-icon'>Cart</ListItemText>
                        </ListItem>
                </Link>
                <Link to={'/liked'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right'>
                            <FavoriteIcon/>
                            <ListItemText className='item-text-icon'>Liked</ListItemText>
                        </ListItem>
                </Link>

            </List>
        </AppBar>
    );
}

export default NavPanel;