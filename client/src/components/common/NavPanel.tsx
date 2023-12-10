import React, { FC } from "react";
import { Link } from 'react-router-dom';

import CategoriesDropdown from "./CategoriesDropdown";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { AppBar, List, ListItem, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../styles/NavPanel.scss';
import useMediaQuery from "@mui/material/useMediaQuery";
const NavPanel : FC = () => {
    const isMobile = useMediaQuery('(max-width:700px)');
    return (
        <AppBar className='nav-panel'>
            <List className='nav-panel-list'>
                <Link to={'/'} className='link-style'>
                    <ListItem className='nav-panel-item nav-panel-item-left'>
                        <HomeIcon
                        />
                        {!isMobile? ( <ListItemText disableTypography={true}  className='nav-panel-item-text-icon' >Home</ListItemText>) : (<div></div>)}

                    </ListItem>
                </Link>
             <ListItem id='categories-icon' className='nav-panel-item nav-panel-item-left'>
                <CategoriesDropdown />
                 {!isMobile? (<ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Categories</ListItemText>) :(<div></div>)}
            </ListItem>

                <Link to={'/cart'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right' >
                            <ShoppingCartIcon
                            />
                            {!isMobile?(<ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Cart</ListItemText>):(<div></div>)}
                        </ListItem>
                </Link>
                <Link to={'/liked'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right'>
                            <FavoriteIcon/>
                            {!isMobile?( <ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Liked</ListItemText>):(<div></div>)}
                        </ListItem>
                </Link>
             <ListItem>
                 <Login/>
             </ListItem>
                <ListItem>
                    <Register/>
                </ListItem>
            </List>
        </AppBar>
    );
}

export default NavPanel;