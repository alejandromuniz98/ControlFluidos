import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddTallerModalPopup} from './AddTallerModalPopup';
import {EditTallerModalPopup} from './EditTallerModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Talleres extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {talleres:[]}
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlTalleres())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({ talleres: data })
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deleteTaller(idTaller)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlTalleres(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_taller: idTaller
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
        const {talleres,nombre, id_taller, id_pais, id_taller_cliente,direccion,id_cliente,nombre_cliente} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })


        return (
            <div className="Com">
            <div className="container">
                            <ComunCabecera></ComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                    Añadir Taller
                </Button>
                <AddTallerModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </ButtonToolbar>

            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>ID</th>
                        <th>ID Taller</th>
                        <th>Nombre</th>
                        <th>País</th>
                        <th>Dirección</th>
                        <th>Cliente</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {talleres.map(taller=>
                        <tr key = {taller.id_taller}  className="Tabla">
                            <td>{taller.id_taller}</td>
                            <td>{taller.id_taller_cliente}</td>
                            <td>{taller.nombre}</td>
                            <td>{taller.pais}</td>
                            <td>{taller.direccion}</td>
                            <td>{taller.nombre_cliente}</td>
                            <td>
                            <ButtonToolbar>
                            <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: true, 
                                                    nombre: taller.nombre,
                                                    pais: taller.pais,
                                                    direccion: taller.direccion,
                                                    id_taller: taller.id_taller,
                                                    id_taller_cliente: taller.id_taller_cliente,
                                                    id_pais:taller.id_pais,
                                                    id_cliente:taller.id_cliente,
                                                    nombre_cliente:taller.nombre_cliente
                                                })
                                    }>
                                    Editar
                            </Button>
                            <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deleteTaller(taller.id_taller)}>
                                    Borrar
                             </Button>
                             <EditTallerModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_taller_cliente = {id_taller_cliente}
                                    nombre = {nombre}
                                    id_pais = {id_pais}
                                    direccion ={direccion}
                                    id_taller={id_taller}
                                    id_cliente={id_cliente}
                                    nombre_cliente={nombre_cliente}
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