import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav,NavDropdown} from 'react-bootstrap'


import '../../css/Navigation.css';


export class ClientNavigation extends Component
{
    render()
    {
        return (
            <Navbar  className="Navbar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2  text-white" to="/home">Inicio</NavLink>
                    <NavLink className="d-inline p-2  text-white" to={localStorage.getItem("ROL")==1 ? "/cliente/usuarios" : window.location}>Usuarios</NavLink>
                    <NavLink className="d-inline p-2  text-white" to="/cliente/ordenes">Órdenes</NavLink>
                    <NavLink className="d-inline p-2  text-white" to={localStorage.getItem("ROL")==1 ? "/cliente/talleres" : window.location}>Talleres</NavLink>
                    <NavDropdown title="Existencias" id="nav-dropdown">
                        <NavDropdown.Item>
                            <NavLink className="d-inline p-2 " to={localStorage.getItem("ROL")==1 ? "/cliente/depositos" : window.location}>Depósitos</NavLink>
                        </NavDropdown.Item> 
                        <NavDropdown.Item>
                            <NavLink className="d-inline p-2 " to={localStorage.getItem("ROL")==1 ? "/cliente/fluidos" : window.location}>Fluidos</NavLink>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavLink className="d-inline p-2  text-white" to={localStorage.getItem("ROL")==1 ? "/cliente/pistolas" : window.location}>Pistolas</NavLink>
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