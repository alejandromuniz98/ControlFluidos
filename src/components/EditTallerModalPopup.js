import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from './Singleton'

import Select from 'react-select';

export class EditTallerModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = {paises:[],clientes:[], showMessage: false, message: '',selected_value:[] };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlPaises())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({ paises: data })
        })
        .catch(console.log)

        fetch(Sing.getUrlClientes())
        .then(res => res.json())
        .then(data => {
            this.setState({ clientes: data })
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
        let id_cli=this.state.selected_value.value
        if(id_cli==null){
            id_cli=this.props.id_cliente
        }
        let Sing= Singleton.getInstance();       
        fetch(Sing.getUrlTalleres(),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_taller: this.props.id_taller,
                    id_taller_cliente: event.target.id_taller_cliente.value,
                    id_pais: event.target.id_pais.value,
                    nombre: event.target.nombre.value,
                    direccion: event.target.direccion.value,
                    id_cliente: id_cli
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
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar taller
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Row>
                                <Col sm={9}>
                                   
                                <FormGroup controlId="id_taller_cliente">
                                      <Form.Label>ID Taller</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="id_taller_cliente"
                                        disabled
                                        defaultValue={this.props.id_taller_cliente}
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="nombre">
                                      <Form.Label>Nombre</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="nombre"
                                        required
                                        defaultValue={this.props.nombre}
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="direccion">
                                      <Form.Label>Direccion</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="direccion"
                                        required
                                        defaultValue={this.props.direccion}
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="id_pais">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control as="select" defaultValue={this.props.id_pais}>
                                        {this.state.paises.map(pais =>
                                          <option key={pais.id_pais} value={pais.id_pais}>
                                                {pais.nombre} 
                                            </option>
                                            )}
                                    </Form.Control>
                                  </FormGroup>

                                  <FormGroup controlId="id_cliente">
                                  <Form.Label>Cliente</Form.Label>
                                  <Select 
                                  id="id_cliente"
                                  options= {this.state.clientes}
                                  onChange={e => this.setState({selected_value: e})}
                                  selectedValue={this.state.selectedValue}
                                  defaultValue={{ label: this.props.nombre_cliente, value: this.props.id_cliente }}
                                  placeholder="Seleccionar cliente..."
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