import { FC } from "react";
import { Link } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// ... (ваш импорт и код)

const NavPanel: FC = () => {
    const isMobile = useMediaQuery('(max-width:700px) and (min-width:401px)');
    const isSmallMobile = useMediaQuery('(max-width:400px)');
    const { currentUser, logoutUser } = useUser();
    const iconSize = isSmallMobile ? 20 : 24;

    const renderNavItem = (to: string, icon: JSX.Element, text: string, className: string) => (
        <Link to={to} className='link-style'>
            <ListItem className={`nav-panel-item ${className}`}>
                {icon}

                {!isMobile && !isSmallMobile && (
                    <ListItemText disableTypography={true} className='nav-panel-item-text-icon'>
                        {text}


                    </ListItemText>
                )}
            </ListItem>
        </Link>
    );

    const renderAuthNavItems = () => {
        if (currentUser) {
            return(
                <>
                {currentUser.id == 1 ? (renderNavItem('/admin', <AdminPanelSettingsIcon
                    sx={{fontSize: iconSize}}/>, 'Admin', 'nav-panel-item-right') ) : null }
                {renderNavItem('/', <AccountCircleIcon
                    sx={{fontSize: iconSize}}/>, currentUser.username, 'nav-panel-item-right')}
                 </>
        )
        }

    };

    return (
        <AppBar className='nav-panel'>
            <List className='nav-panel-list'>
                {renderNavItem('/', <HomeIcon sx={{ fontSize: iconSize }} />, 'Home', 'nav-panel-item-left')}
                <ListItem id='categories-icon' className='nav-panel-item nav-panel-item-left'>
                    <CategoriesDropdown />
                    {!isMobile && !isSmallMobile && (
                        <ListItemText disableTypography={true} className='nav-panel-item-text-icon'>
                            Categories
                        </ListItemText>
                    )}
                </ListItem>
                {renderNavItem('/orders', <ShoppingBagIcon sx={{ fontSize: iconSize }} />, 'Orders', 'nav-panel-item-right')}
                {renderNavItem('/cart', <ShoppingCartIcon sx={{ fontSize: iconSize }} />, 'Cart', 'nav-panel-item-right')}
                {renderNavItem('/liked', <FavoriteIcon sx={{ fontSize: iconSize }} />, 'Liked', 'nav-panel-item-right')}
                {renderAuthNavItems()}
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
            </List>
        </AppBar>
    );
}

export default NavPanel;
