import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from './Singleton'

import Select from 'react-select';

export class AddUsuarioModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {clientes: [],usuarios:[], showMessage:false, message:'',selected_client:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
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

      
      fetch(Sing.getUrlUsuarios())
      .then(res => res.json())
      .then(data => 
      {
        this.setState({usuarios: data})
      })
      .catch(console.log)
    }

    messageClose = (event) =>
    {
      this.setState({showMessage:false});
    }

    handleSubmit(event)
    {
      event.preventDefault();
      if(this.state.selected_client.value==null){
        alert("Error: Debe seleccionar un cliente")
      }else{

      let id_us_cli=0
      let valido=true
      while(valido){
      id_us_cli=Math.floor(Math.random() * (9999 - 1000)) + 1000
      valido=false
      for(let usuario of this.state.usuarios){
        // eslint-disable-next-line
          if(usuario.id_usuario_cliente==id_us_cli && usuario.id_cliente==this.state.selected_client.value){
            valido=true;
          }
      }
    }


        let administrador="0"
        if(event.target.adm.checked){
          administrador="1"
        }

      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlUsuarios(), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id_usuario_cliente: id_us_cli,
          apellidos: event.target.apellidos.value,
          nombre: event.target.nombre.value,
          id_cliente: this.state.selected_client.value,
          admin: administrador
        })
      })
      .then(response => 
      {
          if (response.ok) 
          {
            this.setState({ showMessage: true, message: 'Datos enviados correctamente' });
          }
          else
          {
            this.setState({ showMessage: true, message: 'Error enviando datos' });
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
        return (
          <div className="container">
            <Snackbar
              anchorOrigin={{vertical:'bottom',horizontal:'center'}}
              open={this.state.showMessage}
              autoHideDuration={3000}
              onClose={this.messageClose}
              message={<span id="message-id">{this.state.message}</span>}
              action={[
                <IconButton
                  key="close"
                  arial-label="Cerrar"
                  color="inherit"
                  onClick={this.messageClose}>

                  x
                </IconButton>
              ]}
            />

            <Modal
              {...this.props}

              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Añadir Usuario
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={9}>
 
                                  <FormGroup controlId="nombre">
                                      <Form.Label>Nombre</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="nombre"
                                        required
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="apellidos">
                                      <Form.Label>Apellidos</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="apellidos"
                                        required
                                      />
                                  </FormGroup>

                                  <FormGroup>
                                  <Form.Label>Cliente</Form.Label>
                                  <Select 
                                  id="id_cliente"
                                  options= {this.state.clientes}
                                  onChange={e => this.setState({selected_client: e})}
                                  selectedValue={this.state.selected_client}
                                  placeholder="Seleccionar cliente..."
                                  />
                                  </FormGroup>

                                  <Form.Group controlId="adm">
                                            <Form.Check type="checkbox" label="Permisos de administrador" />
                                        </Form.Group>

                                                          
                          </Col>
                      </Row>
                  </div>
              </Modal.Body>
              <Modal.Footer>                
              <Button variant="primary" type="submit">Añadir</Button>
              </Modal.Footer>
              </Form>
            </Modal>

          </div>
          );
    }
}