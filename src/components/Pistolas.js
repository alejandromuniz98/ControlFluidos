import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddPistolaModalPopup} from './AddPistolaModalPopup';
import {EditPistolaModalPopup} from './EditPistolaModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Pistolas extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {pistolas:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlPistolas())
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
    
    deletePistola(idPistola)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlPistolas(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_pistola: idPistola
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
        const {pistolas,clientes_nombre,id_aceite, id_deposito, id_pistola, nombre_aceite,id_cliente} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })

        return (
            <div className="Com">
            <div className="container">   
                            <ComunCabecera></ComunCabecera>
                <br></br> 
    
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                         Añadir Pistola
                    </Button> 
                    <AddPistolaModalPopup  
                         show={this.state.addModalShow}
                         onHide={addModalClose}
                         pistolas={pistolas}
                     /> 
                </ButtonToolbar>  

            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>ID Pistola</th>
                        <th>Cliente</th>
                        <th>Depósito</th>
                        <th>Fluido</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pistolas.map(pistola=>
                        <tr key = {pistola.id_pistola}  className="Tabla">
                            <td>{pistola.id_pistola}</td>
                            <td>{pistola.clientes_nombre}</td>
                            <td>{pistola.id_deposito}</td>
                            <td>{pistola.nombre_aceite}</td>
                            <td>
                            <ButtonToolbar>
                                <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: true, 
                                                    id_pistola: pistola.id_pistola,
                                                    clientes_nombre: pistola.clientes_nombre,
                                                    id_deposito: pistola.id_deposito,
                                                    nombre_aceite: pistola.nombre_aceite,
                                                    id_cliente: pistola.id_cliente,
                                                    id_aceite: pistola.id_aceite,
                                                    clientes_nombre: pistola.clientes_nombre
                                                })
                                    }>
                                    Editar
                                </Button>
                                <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deletePistola(pistola.id_pistola)}>
                                    Borrar
                                </Button>
                                <EditPistolaModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_pistola = {id_pistola}
                                    clientes_nombre = {clientes_nombre}
                                    id_deposito = {id_deposito}
                                    nombre_aceite = {nombre_aceite}
                                    id_cliente ={id_cliente}
                                    id_aceite={id_aceite}
                                    clientes_nombre={clientes_nombre}
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