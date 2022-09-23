import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddAceiteModalPopup} from './_clientAddAceiteModalPopup';
import Singleton from '../Singleton'

import {ClientComunCabecera} from './_clientComunCabecera'
import {ComunPie} from '../ComunPie'
import '../../css/Comun.css';


export class ClientAceites extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {aceites:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlAceites()+"/"+localStorage.getItem("idCliente"))
        .then(res => res.json())
        .then(data => 
        {
          this.setState({aceites: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deleteAceite(idAceite)
    {
        // eslint-disable-next-line
        if(localStorage.getItem("ROL")==1){
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlAceites()+"/"+localStorage.getItem("idCliente"),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_aceite: idAceite
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
    }
    

    render()
    {
        const {aceites} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})

        return (
            <div className="Com">
        <div className="container">   
                        <ClientComunCabecera></ClientComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: localStorage.getItem("ROL")==1 ? true : false})}>
                    Añadir Fluido
                </Button>
                <AddAceiteModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
            </ButtonToolbar>
            
            <Table className="mt-4"   bordered hover size="sm" >
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {aceites.map(aceite=>
                        <tr key = {aceite.id_aceite} className="Tabla">
                            <td>{aceite.descripcion}</td>
                            <td>
                            <ButtonToolbar>
                                <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deleteAceite(aceite.id_aceite)}>
                                    Borrar
                                </Button>
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