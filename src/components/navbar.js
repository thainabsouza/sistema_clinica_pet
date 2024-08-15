// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function CustomNavbar() {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">Minha Clínica</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">Listar Clientes</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/cadastro">Cadastrar Cliente</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default CustomNavbar;
