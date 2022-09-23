import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {EditPistolaModalPopup} from './_clientEditPistolaModalPopup';
import Singleton from '../Singleton'

import {ClientComunCabecera} from './_clientComunCabecera'
import {ComunPie} from '../ComunPie'
import '../../css/Comun.css';


export class ClientPistolas extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {pistolas:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlPistolas()+"/"+localStorage.getItem("idCliente"))
        .then(res => res.json())
        .then(data => 
        {
          this.setState({pistolas: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

       

    render()
    {
        const {pistolas, id_deposito, id_pistola, nombre_aceite,nombre_taller} = this.state;
        let editModalClose = () => this.setState({editModalShow: false })

        return (
            <div className="Com">
        <div className="container">   
                        <ClientComunCabecera></ClientComunCabecera>
            <br></br>         
            
            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>ID Pistola</th>
                        <th>Taller</th>
                        <th>Depósito</th>
                        <th>Fluido</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pistolas.map(pistola=>
                        <tr key = {pistola.id_pistola}  className="Tabla">
                            <td>{pistola.id_pistola}</td>
                            <td>{pistola.nombre_taller}</td>
                            <td>{pistola.id_deposito}</td>
                            <td>{pistola.nombre_aceite}</td>
                            <td>
                            <ButtonToolbar>
                                <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                // eslint-disable-next-line
                                    this.setState({ editModalShow: localStorage.getItem("ROL")==1 ? true : false, 
                                                    id_pistola: pistola.id_pistola,
                                                    nombre_taller: pistola.nombre_taller,
                                                    id_deposito: pistola.id_deposito,
                                                    nombre_aceite: pistola.nombre_aceite,
                                                })
                                    }>
                                    Editar
                                </Button>
                                <EditPistolaModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_pistola = {id_pistola}
                                    id_deposito = {id_deposito}
                                    nombre_taller = {nombre_taller}
                                    nombre_aceite ={nombre_aceite}
                                   
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