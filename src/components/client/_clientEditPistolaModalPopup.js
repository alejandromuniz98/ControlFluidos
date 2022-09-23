import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from '../Singleton'

export class EditPistolaModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { depositos:[], showMessage: false, message: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlDepositos()+"/"+localStorage.getItem("idCliente"))
            .then(res => res.json())
            .then(data => {
                this.setState({ depositos: data })
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
        fetch(Sing.getUrlPistolas()+"/"+localStorage.getItem("idCliente"),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pistola: event.target.id_pistola.value,
                    id_deposito: event.target.id_deposito.value
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
                   //size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar pistola
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Row>
                                <Col sm={11}>
                                   
                                        <FormGroup controlId="id_pistola">
                                            <Form.Label>ID Pistola</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="id_pistola"
                                                disabled
                                                defaultValue={this.props.id_pistola}
                                            />
                                        </FormGroup>

                                        <FormGroup controlId="id_deposito">
                                            <Form.Label>Deposito</Form.Label>
                                            <Form.Control as="select" defaultValue={this.props.id_deposito}>
                                                {this.state.depositos.map(deposito =>
                                                    <option key={deposito.id_deposito} value={deposito.id_deposito}>
                                                        {deposito.id_deposito}
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