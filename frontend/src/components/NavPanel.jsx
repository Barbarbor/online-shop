import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactSVG } from 'react-svg';
import ShoppingCartIcon from '../assets/icons/shopping-cart-icon.svg';
import HeartRedIcon from '../assets/icons/heart-red-icon.svg';
import ReactIcon from '../assets/icons/react-icon.svg';
import CategoriesIcon from '../assets/icons/categories-icon.svg'; // Hamburger icon for categories
import CategoriesDropdown from './CategoriesDropdown'; // Import the CategoriesDropdown component
import { Link } from 'react-router-dom';

function NavPanel() {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Categories Dropdown */}

                    {/* Integrate the CategoriesDropdown component here */}
                    <CategoriesDropdown />


                {/* Rest of the navigation items */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            <ReactSVG
                                src={ReactIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}
                                className="nav-icon"
                            />
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            <ReactSVG
                                src={ShoppingCartIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}
                                className="nav-icon"
                            />
                            Cart
                        </Nav.Link>
                        <Nav.Link as={Link} to="/liked">
                            <ReactSVG
                                src={HeartRedIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', 24);
                                    svg.setAttribute('height', 24);
                                }}
                                className="nav-icon"
                            />
                            Liked
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavPanel;
