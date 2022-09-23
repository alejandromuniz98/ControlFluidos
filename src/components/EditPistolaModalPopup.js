import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from './Singleton'
import Select from 'react-select';

export class EditPistolaModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { clientes: [], depositos:[], showMessage: false, message: '',selected_value:[] };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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
        fetch(Sing.getUrlPistolas(),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_pistola: event.target.id_pistola.value,
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


                                        <FormGroup controlId="id_cliente">
                                        <Form.Label>Cliente</Form.Label>
                                  <Select 
                                  id="id_cliente"
                                  options= {this.state.clientes}
                                  onChange={e => this.setState({selected_value: e})}
                                  selectedValue={this.state.selectedValue}
                                  defaultValue={{ label: this.props.clientes_nombre, value: this.props.id_cliente }}
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