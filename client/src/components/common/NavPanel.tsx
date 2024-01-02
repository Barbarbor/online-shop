import React, { FC } from "react";
import { Link } from 'react-router-dom';
import {useUser} from "../../hooks/useUser";
import CategoriesDropdown from "./CategoriesDropdown";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Register from "../auth/Register";
import { AppBar, List, ListItem, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../styles/NavPanel.scss';
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const NavPanel : FC = () => {
    const isMobile = useMediaQuery('(max-width:700px) and (min-width:401px)');
    const isSmallMobile = useMediaQuery('(max-width:400px)');
    const {currentUser, logoutUser} = useUser();
    let iconSize:number;
    if(isSmallMobile){
        iconSize=20;
    }
    else{
        iconSize=24;
    }
    console.log(currentUser);
    return (
        <AppBar className='nav-panel'>
            <List className='nav-panel-list'>
                <Link to={'/'} className='link-style'>
                    <ListItem className='nav-panel-item nav-panel-item-left'>
                        <HomeIcon sx={{fontSize:iconSize}}
                        />
                        {!isMobile && !isSmallMobile? ( <ListItemText disableTypography={true}  className='nav-panel-item-text-icon' >Home</ListItemText>) : (<div></div>)}

                    </ListItem>
                </Link>
             <ListItem id='categories-icon' className='nav-panel-item nav-panel-item-left'>
                <CategoriesDropdown />
                 {!isMobile && !isSmallMobile? (<ListItemText disableTypography={true}  className='nav-panel-item-text-icon'>Categories</ListItemText>) :(<div></div>)}
            </ListItem>
                <Link to={'/orders'} className='link-style'>
                    <ListItem className='nav-panel-item nav-panel-item-right'>
                        <ShoppingBagIcon sx={{fontSize:iconSize}}/>
                        {!isMobile && !isSmallMobile?(<ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Orders</ListItemText>):(<div></div>)}
                    </ListItem>
                </Link>
                <Link to={'/cart'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right' >
                            <ShoppingCartIcon sx={{fontSize:iconSize}}
                            />
                            {!isMobile && !isSmallMobile?(<ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Cart</ListItemText>):(<div></div>)}
                        </ListItem>
                </Link>
                <Link to={'/liked'} className='link-style'>
                        <ListItem className='nav-panel-item nav-panel-item-right'>
                            <FavoriteIcon sx={{fontSize:iconSize}}/>
                            {!isMobile && !isSmallMobile?( <ListItemText disableTypography={true} className='nav-panel-item-text-icon'>Liked</ListItemText>):(<div></div>)}
                        </ListItem>
                </Link>
                {!currentUser ? (

                    <ListItem className='nav-panel-item nav-panel-item-right'>
                        <LoginIcon sx={{fontSize:iconSize}}/>
                        <Login defaultShowModalState={false}/>
                        {!isMobile && !isSmallMobile?(<span style={{marginTop:'4px',marginLeft:'5px'}}>Login </span>):(<div></div>)}
                        </ListItem>

                ) :(<div></div>) }

                {currentUser ? (
                    <ListItem className='nav-panel-item nav-panel-item-right'>
                        <LogoutIcon sx={{fontSize:iconSize}}/>
                        <Logout/>
                        {!isMobile && !isSmallMobile?(<span style={{marginTop:'4px',marginLeft:'-4px'}}>Logout </span>):(<div></div>)}
                    </ListItem>
                ): (
                    <div></div>
                )}
                {currentUser ? (
                    <ListItem className='nav-panel-item nav-panel-item-right'>
                        <AccountCircleIcon sx={{fontSize:iconSize}}/>
                        {!isMobile && !isSmallMobile? ( <ListItemText style={{marginTop:'4px'}}> {currentUser.username}</ListItemText> ):(<div></div>)}

                    </ListItem>
                ): (<div></div>) }
            </List>
        </AppBar>
    );
}

export default NavPanel;