import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/wardrobe.png"
              alt="Outfit Planner Logo"
              className="logo-img"
            />
            Outfit Planner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <NavDropdown title="dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="#/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="#/closet">Closet</NavDropdown.Item>
              <NavDropdown.Item href="#/camera">Add Item</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;