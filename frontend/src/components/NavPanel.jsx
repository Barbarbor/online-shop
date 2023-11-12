import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactSVG } from 'react-svg';
import ShoppingCartIcon from '../assets/icons/shopping-cart-icon.svg';
import HeartRedIcon from '../assets/icons/heart-red-icon.svg';
import ReactIcon from '../assets/icons/react-icon.svg';
import CategoriesIcon from '../assets/icons/categories-icon.svg'; // Hamburger icon for categories
import CategoriesDropdown from './CategoriesDropdown'; // Import the CategoriesDropdown component
import { Link } from 'react-router-dom';
import{AppBar,List,ListItem,ListItemText} from "@mui/material";
import './NavPanel.scss';
function NavPanel() {

    return (
        <AppBar className='nav-panel'>
            <List className='nav-panel-list'>
             <ListItem className='nav-panel-item'><CategoriesDropdown />
                <ListItemText className='item-text-icon'>Categories</ListItemText>
            </ListItem>
                <ListItem className='nav-panel-item'>
                    <ReactSVG
                                src={ReactIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}

                    />
                          <ListItemText className='item-text-icon'>Home</ListItemText>

                </ListItem>
                        <ListItem className='nav-panel-item'>
                            <ReactSVG
                                src={ShoppingCartIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}

                            />
                            <ListItemText className='item-text-icon'>Cart</ListItemText>
                        </ListItem>
                        <ListItem cclassName='nav-panel-item'>
                            <ReactSVG
                                src={HeartRedIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}
                                className="nav-icon"
                            />
                            <ListItemText className='item-text-icon'>Liked</ListItemText>
                        </ListItem>

            </List>
        </AppBar>
    );
}

export default NavPanel;
