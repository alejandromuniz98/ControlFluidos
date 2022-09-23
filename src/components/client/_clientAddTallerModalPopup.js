import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from '../Singleton'

export class AddTallerModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {paises:[], localidadesshowMessage:false, message:''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() 
    {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlPaises())
        .then(res => res.json())
        .then(data => 
        {
          this.setState({ paises: data })
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
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlTalleres()+"/"+localStorage.getItem("idCliente"), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id_taller_cliente: event.target.id_taller_cliente.value,
            id_pais: event.target.id_pais.value,
            nombre: event.target.nombre.value,
            direccion: event.target.direccion.value
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
                  Añadir Taller
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={9}>
                              
                                  <FormGroup controlId="id_taller_cliente">
                                      <Form.Label>ID Taller</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="id_taller_cliente"
                                        min="1"
                                        step="1"
                                        required
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="nombre">
                                      <Form.Label>Nombre</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="nombre"
                                        required
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="direccion">
                                      <Form.Label>Dirección</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="direccion"
                                        required
                                      />
                                  </FormGroup>

                                  <FormGroup controlId="id_pais">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control as="select">
                                        {this.state.paises.map(pais =>
                                          <option key={pais.id_pais} value={pais.id_pais}>
                                                {pais.nombre} 
                                            </option>
                                            )}
                                    </Form.Control>
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