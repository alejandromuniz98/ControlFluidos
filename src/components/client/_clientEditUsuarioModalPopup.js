import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from '../Singleton'

export class EditUsuarioModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { showMessage: false, message: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    messageClose = (event) => 
    {
        this.setState({ showMessage: false });
    }

    handleSubmit(event) 
    {
        event.preventDefault(); 
        let administrador="0"
        if(event.target.adm.checked){
            administrador="1"
          }
        let Sing= Singleton.getInstance();       
        fetch(Sing.getUrlUsuarios()+"/"+localStorage.getItem("idCliente"),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario: this.props.id_usuario,
                    id_usuario_cliente: event.target.id_usuario_cliente.value,
                    apellidos: event.target.apellidos.value,
                    nombre: event.target.nombre.value,
                    password: event.target.password.value,
                    admin:administrador
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
                            Editar usuario
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Row>
                                <Col sm={9}>
                                   
                                        <FormGroup controlId="id_usuario_cliente">
                                            <Form.Label>ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="id_usuario_cliente"
                                                disabled
                                                defaultValue={this.props.id_usuario_cliente}
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

                                        <FormGroup controlId="apellidos">
                                            <Form.Label>Apellidos</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="apellidos"
                                                required
                                                defaultValue={this.props.apellidos}
                                            />
                                        </FormGroup>

                                        <FormGroup controlId="password">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="password"
                                                defaultValue={this.props.password}
                                            />
                                        </FormGroup>

                                        <Form.Group controlId="adm">
                                            <Form.Check type="checkbox" label="Permisos de administrador" defaultChecked={this.props.rol==1 ? true:false} />
                                        </Form.Group>


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