import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepositoModalPopup} from './AddDepositoModalPopup';
import {EditDepositoModalPopup} from './EditDepositoModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';

export class Depositos extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {depositos:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlDepositos())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({depositos: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deleteDeposito(idDeposito)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlDepositos(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_deposito: idDeposito
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
        const {depositos,id_aceite, id_deposito, litros_disponibles, litros_totales, nombre_aceite,id_cliente,nombre_taller,cliente_nombre,id_taller} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })

        return (
            <div className="Com">
        <div className="container">   
                        <ComunCabecera></ComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                    Añadir Depósito
                </Button>
                <AddDepositoModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </ButtonToolbar>
            
            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light"className="Cabecera">
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Disponibles</th>
                        <th>Fluido</th>
                        <th>Taller</th>
                        <th>Cliente</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody >
                    {depositos.map(deposito=>
                        <tr key = {deposito.id_deposito}  className="Tabla">
                            <td>{deposito.id_deposito}</td>
                            <td>{deposito.litros_totales} litros</td>
                            <td>{deposito.litros_disponibles} litros</td>
                            <td>{deposito.nombre_aceite}</td>
                            <td>{deposito.nombre_taller}</td>
                            <td>{deposito.cliente_nombre}</td>
                            <td>
                            <ButtonToolbar>
                                <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: true, 
                                                    id_deposito: deposito.id_deposito,
                                                    litros_totales: deposito.litros_totales,
                                                    litros_disponibles: deposito.litros_disponibles,
                                                    nombre_aceite: deposito.nombre_aceite,
                                                    id_aceite: deposito.id_aceite,
                                                    id_cliente: deposito.id_cliente,
                                                    nombre_taller: deposito.nombre_taller,
                                                    cliente_nombre:deposito.cliente_nombre,
                                                    id_taller:deposito.id_taller
                                                })
                                    }>
                                    Editar
                                </Button>
                                <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deleteDeposito(deposito.id_deposito)}>
                                    Borrar
                                </Button>
                                <EditDepositoModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_deposito = {id_deposito}
                                    litros_totales = {litros_totales}
                                    litros_disponibles = {litros_disponibles}
                                    nombre_aceite = {nombre_aceite}
                                    id_aceite= {id_aceite}
                                    id_cliente={id_cliente}
                                    nombre_taller={nombre_taller}
                                    cliente_nombre={cliente_nombre}
                                    id_taller={id_taller}
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