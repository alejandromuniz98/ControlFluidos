import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddAceiteModalPopup} from './AddAceiteModalPopup';
import Singleton from './Singleton'

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Aceites extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {aceites:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlAceites())
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
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlAceites(),
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
    

    render()
    {
        const {aceites} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        
        return (
            <div className="Com">
        <div className="container">   
                        <ComunCabecera></ComunCabecera>
            <br></br>         
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cliente</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {aceites.map(aceite=>
                        <tr key = {aceite.id_aceite} className="Tabla">
                            <td>{aceite.id_aceite}</td>
                            <td>{aceite.descripcion}</td>
                            <td>{aceite.cliente_nombre}</td>
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