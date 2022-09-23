import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import Singleton from './Singleton'
import {AddPaisModalPopup} from './AddPaisModalPopup';

import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';


export class Paises extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {paises:[], addModalShow: false, editModalShow: false};
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlPaises())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({paises: data})
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        this.componentDidMount();
    }

    deletePais(idPais)
    {
        if (window.confirm('¿Está seguro?'))
        {
            let Sing= Singleton.getInstance();
            fetch(Sing.getUrlPaises(),
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_pais: idPais
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
        const {paises} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})


        return (
            <div className="Com">
        <div className="container">   
                        <ComunCabecera></ComunCabecera>
            <br></br> 

            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModalShow: true})}>
                     Añadir País
                </Button> 
                <AddPaisModalPopup  
                     show={this.state.addModalShow}
                     onHide={addModalClose}
                 /> 
            </ButtonToolbar>         
            
            <Table className="mt-4"  bordered hover size="sm">
                <thead  class="thead-light" className="Cabecera">
                    <tr>
                        <th>ID País</th>
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paises.map(pais=>
                        <tr key = {pais.id_pais}  className="Tabla">
                            <td>{pais.id_pais}</td>
                            <td>{pais.nombre}</td>
                            <td>
                                <Button size="sm" className="mr-2" variant="danger" onClick={() => this.deletePais(pais.id_pais)}>
                                    Borrar
                                </Button>

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