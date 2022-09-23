import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from './Singleton'
import Select from 'react-select';

export class EditDepositoModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { aceites: [],talleres:[], showMessage: false, message: '', selected_fluido:[],selected_taller:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

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
        this.setState({ showMessage: false });
    }

    handleSubmit(event) 
    {
        event.preventDefault();
        let id_ta=this.state.selected_taller.value
        let id_ac=this.state.selected_fluido.value

      if(id_ta==null){
        id_ta=this.props.id_taller
      }
      if(id_ac==null){
        id_ac=this.props.id_aceite
      }


      let Sing= Singleton.getInstance();       
        fetch(Sing.getUrlDepositos(),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_deposito:event.target.id_deposito.value,
                    id_aceite: id_ac,
                    litros_disponibles: event.target.litros_disponibles.value,
                    litros_totales: event.target.litros_totales.value,
                    id_taller: id_ta,

                })
            })
            .then(response => {
                if (response.ok) 
                {
                    this.setState({ showMessage: true, message: 'Datos actualizados correctamente' });
                }
                else 
                {
                    this.setState({ showMessage: true, message: 'Error actualizando datos' });
                }
            })
            .catch(error => {
                //console.log('Hubo un problema con la petición Fetch:' + error.message);
                alert(error.message);
            });
        }
    
    

    render() 
    {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
                            Editar Deposito
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
                                        defaultValue={this.props.id_deposito}
                                        disabled
                                        required
                                      />
                                  </FormGroup>
                                  <FormGroup controlId="litros_totales">
                                      <Form.Label>Capacidad</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_totales"
                                        required
                                        defaultValue={this.props.litros_totales}
                                        min="0" 
                                        step="0.01"
                                      />
                                  </FormGroup>
                                  <FormGroup controlId="litros_disponibles">
                                      <Form.Label>Litros Disponibles </Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_disponibles"
                                        required
                                        defaultValue={this.props.litros_disponibles}
                                        min="0" 
                                        step="0.01"
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="id_taller">
                                  <Form.Label>Taller</Form.Label>
                                  <Select 
                                  id="id_taller"
                                  options= {this.state.talleres}
                                  onChange={e => this.setState({selected_taller: e})}
                                  selectedValue={this.state.selectedValue}
                                  defaultValue={{ label: this.props.nombre_taller+"-"+this.props.cliente_nombre, value: this.props.nombre_taller }}
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
                                  defaultValue={{ label: this.props.nombre_aceite+"-"+this.props.cliente_nombre, value: this.props.id_aceite }}
                                  placeholder="Seleccionar fluido..."
                                  />
                                  </FormGroup>
                                    
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" type="submit">Actualizar</Button>
                    </Modal.Footer>
                    </Form>
                </Modal>

            </div>
        );
    }
}