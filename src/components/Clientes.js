import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddClienteModalPopup} from './AddClienteModalPopup';
import {EditClienteModalPopup} from './EditClienteModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Clientes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {clientes:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlClientes())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({clientes: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deleteCliente(idCliente)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlClientes(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_cliente: idCliente
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
        const {clientes, id_cliente, CIF, razon_social, id_pais,password} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })

        return (
            <div className="Com">
        <div className="container">   
            <ComunCabecera></ComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                    Añadir cliente
                </Button>
                <AddClienteModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </ButtonToolbar>
            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera"> 
                    <tr>
                        <th>CIF</th>
                        <th>Razón social</th>
                        <th>País</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente=>
                        <tr key = {cliente.CIF}  className="Tabla">
                            <td>{cliente.CIF}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.pais}</td>
                            <td>
                            <ButtonToolbar>
                                <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: true, 
                                                    id_cliente: cliente.id_cliente,
                                                    CIF: cliente.CIF,
                                                    razon_social: cliente.nombre,
                                                    id_pais: cliente.id_pais,
                                                    password: cliente.password
                                                })
                                    }>
                                    Editar
                                </Button>
                                <Button size="sm"  className="mr-2" variant="danger" onClick={() => this.deleteCliente(cliente.id_cliente)}>
                                    Borrar
                                </Button>
                                <EditClienteModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_cliente = {id_cliente}
                                    CIF = {CIF}
                                    razon_social = {razon_social}
                                    id_pais = {id_pais}
                                    password ={password}
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
    }}