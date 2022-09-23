import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav,NavDropdown} from 'react-bootstrap'


import '../css/Navigation.css';


export class Navigation extends Component
{
    render()
    {
        return (
            <Navbar  className="Navbar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2  text-white" to="/admin">Inicio</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/paises">Países</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/clientes">Clientes</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/talleres">Talleres</NavLink>
                    <NavLink className="d-inline p-2 text-white" to="/pistolas">Pistolas</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/usuarios">Usuarios</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/ordenes">Órdenes</NavLink>
                    <NavDropdown title="Existencias" id="nav-dropdown">
                        <NavDropdown.Item>
                            <NavLink className="d-inline p-2 " to="/depositos">Depósitos</NavLink>
                        </NavDropdown.Item> 
                        <NavDropdown.Item>
                            <NavLink className="d-inline p-2 " to="/aceites">Fluidos</NavLink>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>

                <NavDropdown title= {localStorage.getItem("NombreCliente")} id="nav-dropdown">
                        <NavDropdown.Item>
                            <NavLink className="d-inline p-2 " to="/">Cerrar Sesión</NavLink>
                        </NavDropdown.Item> 
                </NavDropdown>


            </Navbar>            
        );
    }
}
