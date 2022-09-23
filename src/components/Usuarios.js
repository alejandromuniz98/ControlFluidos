import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddUsuarioModalPopup} from './AddUsuarioModalPopup';
import {EditUsuarioModalPopup} from './EditUsuarioModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Usuarios extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {usuarios:[]}
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlUsuarios())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({ usuarios: data })
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deleteUsuario(idUsuario)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlUsuarios(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_usuario: idUsuario
                    })
                })
                .then(response => response.json())
                .then(response => 
                {
                  // eslint-disable-next-line
                    if (response.code==200) 
                    {

                    }
                    else
                    {
          // eslint-disable-next-line
                      alert('Error en el borrado:'+' '+response.mes)
                    }
                })
                .catch(error =>  
                {
                    //console.log('Hubo un problema con la petición Fetch:' + error.message);
                    alert(error.message);
                }); 
        }
    }

    render()
    {   
        const {usuarios,id_cliente, nombre, apellidos, id_usuario_cliente, id_usuario,rol,cliente} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })


        return (
            <div className="Com">
            <div className="container">
                            <ComunCabecera></ComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                    Añadir Usuario
                </Button>
                <AddUsuarioModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </ButtonToolbar>

            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>ID Usuario</th>
                        <th>PIN</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cliente</th>
                        <th>Rol</th>
                        <th>Fecha de alta</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario=>
                        <tr key = {usuario.id_usuario}  className="Tabla">
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.id_usuario_cliente}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.cliente}</td>
                            <td>{usuario.rol==0 ? "Operario":"Administrador"}</td>
                            <td>{usuario.fecha_alta}</td>
                            <td>
                            <ButtonToolbar>
                            <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: true, 
                                                    id_cliente: usuario.id_cliente,
                                                    nombre: usuario.nombre,
                                                    apellidos: usuario.apellidos,
                                                    id_usuario: usuario.id_usuario,
                                                    id_usuario_cliente: usuario.id_usuario_cliente,
                                                    rol: usuario.rol,
                                                    cliente:usuario.cliente
                                                })
                                    }>
                                    Editar
                            </Button>
                            <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deleteUsuario(usuario.id_usuario)}>
                                    Borrar
                             </Button>
                             <EditUsuarioModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_cliente = {id_cliente}
                                    nombre = {nombre}
                                    apellidos = {apellidos}
                                    id_usuario = {id_usuario}
                                    id_usuario_cliente ={id_usuario_cliente}
                                    rol={rol}
                                    cliente={cliente}
                                />
                            </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>                
            </Table>
 
            <ComunPie></ComunPie>
            </div>
            </div>

        );
    }
}
