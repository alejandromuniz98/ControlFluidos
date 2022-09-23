import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from '../Singleton'

export class EditDepositoModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { aceites: [],talleres:[], showMessage: false, message: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlAceites()+"/"+localStorage.getItem("idCliente"))
            .then(res => res.json())
            .then(data => {
                this.setState({ aceites: data })
            })
            .catch(console.log)

            fetch(Sing.getUrlTalleres()+"/"+localStorage.getItem("idCliente"))
            .then(res => res.json())
            .then(data => 
            {
              this.setState({talleres: data})
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
        let Sing= Singleton.getInstance();       
        fetch(Sing.getUrlDepositos()+"/"+localStorage.getItem("idCliente"),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_deposito:event.target.id_deposito.value,
                    id_aceite: event.target.id_aceite.value,
                    litros_disponibles: event.target.litros_disponibles.value,
                    litros_totales: event.target.litros_totales.value,
                    id_taller: event.target.id_taller.value
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
                            Editar depósito
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

                                  <FormGroup controlId="id_taller">
                                    <Form.Label>Taller</Form.Label>
                                    <Form.Control as="select" defaultValue={this.props.id_taller}>
                                        {this.state.talleres.map(taller =>
                                          <option key={taller.nombre_taller} value={taller.id_taller}>
                                                {taller.nombre} 
                                            </option>
                                            )}
                                    </Form.Control>
                                  </FormGroup>


                                  <FormGroup controlId="litros_totales">
                                      <Form.Label>Capacidad total (litros)</Form.Label>
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
                                      <Form.Label>Capacidad actual (litros)</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_disponibles"
                                        required
                                        defaultValue={this.props.litros_disponibles}
                                        min="0" 
                                        step="0.01"
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="id_aceite">
                                    <Form.Label>Fluido</Form.Label>
                                    <Form.Control as="select" defaultValue={this.props.id_aceite}>
                                        {this.state.aceites.map(aceite =>
                                          <option key={aceite.id_aceite} value={aceite.id_aceite}>
                                                {aceite.descripcion} 
                                            </option>
                                            )}
                                    </Form.Control>
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