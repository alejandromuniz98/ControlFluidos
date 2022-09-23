import Singleton from '../Singleton';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddOrdenModalPopup} from './_clientAddOrdenModalPopup';
import {EditOrdenModalPopup} from './_clientEditOrdenModalPopup';

import '../../css/Ordenes.css';
import {ClientComunCabecera} from './_clientComunCabecera'
import {ComunPie} from '../ComunPie'

export class ClientOrdenes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {ordenes:[], addModalShow: false, editModalShow: false};
    }
    

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlOrdenes()+"/"+localStorage.getItem("idCliente"))
        .then(res => res.json())
        .then(data => 
        {
          this.setState({ordenes: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }


    deleteOrden(idOrden)
    {
        // eslint-disable-next-line
        if(localStorage.getItem("ROL")==1){
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlOrdenes()+"/"+localStorage.getItem("idCliente"),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_orden: idOrden
                    })
                })
                .then(response => {
                    if (response.ok) 
                    {
                        
                    }
                    else 
                    {
                        alert("Error en el borrado");
                    }
                })
                .catch(error => {
                    //console.log('Hubo un problema con la petición Fetch:' + error.message);
                    alert(error.message);
                });
        }
    }
}

    render()
    {
        const {ordenes, id_cliente, id_orden, id_orden_cliente, litros_preseleccion, id_aceite,id_usuario,kms,matricula} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false })

        return (
            <div className="Com">
        <div className="container">  

                        <ClientComunCabecera></ClientComunCabecera>
            <br></br>

            <ButtonToolbar>
                <Button variant="primary"  onClick={()=> this.setState({addModalShow: localStorage.getItem("ROL")==1 ? true : false})}>
                     Añadir Orden
                </Button> 
                <AddOrdenModalPopup  
                     show={this.state.addModalShow}
                     onHide={addModalClose}
                 /> 
            </ButtonToolbar> 


            <span className="ordFin">Orden Finalizada</span>

            <Table className="mt-4"  bordered hover size="sm" >
                <thead class="thead-light"className="Cabecera">
                    <tr>
                        <th>ID Orden</th>
                        <th>Usuario</th>
                        <th>Preselección</th>
                        <th>Fluido</th>
                        <th>Fecha Alta</th>
                        <th>Matrícula</th>
                        <th>Kms</th>
                        <th>Opciones</th>
                        <th>Fecha Suministro</th>
                        <th>Suministro</th>
                        <th>ID Pistola</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map(orden=>
                        <tr key = {orden.id_orden} className={orden.terminado===1 ? 'complet' : 'nocomplet'}>
                            <td>{orden.id_orden_cliente}</td>
                            <td>{orden.usuario_nombre} {orden.usuario_apellido}</td>
                            <td>{orden.litros_preseleccion} litros</td>
                            <td>{orden.descripcion}</td>
                            <td>{orden.fecha_alta}</td>
                            <td>{orden.matricula}</td>
                            <td>{orden.kms_vehiculo}</td>
                            <td>
                             <ButtonToolbar>
                               <Button size="sm" className="mr-2" variant="info" onClick={() => 
                                    this.setState({ editModalShow: orden.terminado==0&&localStorage.getItem("ROL")==1 ? true : false,
                                                    id_orden: orden.id_orden, 
                                                    id_cliente: orden.id_cliente,
                                                    id_usuario: orden.id_usuario,
                                                    id_orden_cliente: orden.id_orden_cliente,
                                                    litros_preseleccion: orden.litros_preseleccion,
                                                    id_aceite: orden.id_aceite,
                                                    matricula: orden.matricula,
                                                    kms:orden.kms_vehiculo
                                                })
                                    }>
                                    Editar
                                </Button>
                                <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deleteOrden(orden.id_orden)}>
                                    Borrar
                                </Button>
                                <EditOrdenModalPopup
                                    show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    id_orden= {id_orden}
                                    id_cliente = {id_cliente}
                                    id_orden_cliente = {id_orden_cliente}
                                    id_usuario= {id_usuario}
                                    litros_preseleccion = {litros_preseleccion}
                                    id_aceite = {id_aceite}
                                    matricula={matricula}
                                    kms={kms}
                                /> 
                            </ButtonToolbar> 
                            </td>
                            <td>{orden.fecha_suministro}</td>
                            <td>{orden.litros_suministrados==null ? "":orden.litros_suministrados+" litros"} </td>
                            <td>{orden.id_pistola}</td>
                        </tr>
                    )}
                </tbody>                
            </Table>
            <ComunPie></ComunPie>
        </div>
        </div>
        );
    }}