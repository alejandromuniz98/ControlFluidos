import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from './Singleton'

import Select from 'react-select';

export class AddDepositoModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {talleres: [],aceites:[], showMessage:false, message:'',selected_value:[],selected_fluido:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() 
    {
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlTalleres())
      .then(res => res.json())
      .then(data => 
      {
        this.setState({talleres: data})
      })
      .catch(console.log)

      fetch(Sing.getUrlAceites())
      .then(res => res.json())
      .then(data => 
      {
        this.setState({aceites: data})
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
        alert("Error: Debe seleccionar un taller")
      }else{if(this.state.selected_fluido==null){
        alert("Error: Debe seleccionar un fluido")
      }else{

      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlDepositos(), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_deposito:event.target.id_deposito.value,
            id_taller: this.state.selected_value.value,
            litros_disponibles: event.target.litros_disponibles.value,
            litros_totales: event.target.litros_totales.value,
            id_aceite: this.state.selected_fluido.value,
        })
      })
      .then(response => response.json())
      .then(response => 
      {
        // eslint-disable-next-line
          if (response.code==200) 
          {
            this.setState({ showMessage: true, message: 'Datos enviados correctamente' });
          }
          else
          {
            this.setState({ showMessage: true, message: 'Error enviando datos: '+response.mes });

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
              size=""
              aria-labelledby="contained-modal-title-vcenter"
              centered>
                <Form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Añadir deposito
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={9}>
                              
                                <FormGroup controlId="id_deposito">
                                      <Form.Label>Nombre</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="id_deposito"
                                        required
                                      />
                                  </FormGroup>
                                  <FormGroup controlId="litros_totales">
                                      <Form.Label>Capacidad (litros)</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_totales"
                                        min="0"  
                                        step="0.01"
                                        required
                                      />
                                  </FormGroup>
                                  <FormGroup controlId="litros_disponibles">
                                      <Form.Label>Disponibles (litros) </Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_disponibles"
                                        required
                                        min="0" 
                                        step="0.01"
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="id_taller">
                                  <Form.Label>Taller</Form.Label>
                                  <Select 
                                  id="id_taller"
                                  options= {this.state.talleres}
                                  onChange={e => this.setState({selected_value: e})}
                                  selectedValue={this.state.selectedValue}
                                  placeholder="Seleccionar taller..."
                                  />
                                  </FormGroup>

                                  <FormGroup controlId="id_aceite">
                                  <Form.Label>Fluido</Form.Label>
                                  <Select 
                                  id="id_aceite"
                                  options= {this.state.aceites}
                                  onChange={e => this.setState({selected_fluido: e})}
                                  selectedValue={this.state.selectedValue}
                                  placeholder="Seleccionar fluido..."
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