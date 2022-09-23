import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from './Singleton'

import Select from 'react-select';

export class AddAceiteModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {aceites: [],clientes:[], showMessage:false, message:'',selected_value:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() 
    {
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlClientes())
      .then(res => res.json())
      .then(data => {
          this.setState({ clientes: data })
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
      if(this.state.selected_value.value==null){
        alert("Error: Debe seleccionar un cliente")
      }else{
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlAceites(), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            descripcion: event.target.descripcion.value,
            id_cliente: this.state.selected_value.value
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
              //size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
                <Form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Añadir Fluido
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={11}>
                              
                                <FormGroup controlId="descripcion">
                                      <Form.Label>Nombre</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="descripcion"
                                        required
                                      />
                                </FormGroup>

                                <FormGroup controlId="id_cliente">
                                <Form.Label>Cliente</Form.Label>
                                  <Select 
                                  id="id_cliente"
                                  options= {this.state.clientes}
                                  onChange={e => this.setState({selected_value: e})}
                                  selectedValue={this.state.selectedValue}
                                  placeholder="Seleccionar cliente..."
                                  />
                                  </FormGroup>
                            
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