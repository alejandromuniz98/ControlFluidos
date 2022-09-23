import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from './Singleton'


import '../css/Modal.css';
export class AddClienteModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {paises: [], showMessage:false, message:''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() 
    {
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlPaises())
      .then(res => res.json())
      .then(data => 
      {
        this.setState({paises: data})
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
      fetch(Sing.getUrlClientes(), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          CIF: event.target.cif.value,
          id_pais: event.target.id_pais.value,
          nombre: event.target.razon_social.value,
          password: event.target.password.value
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
                <Form onSubmit={this.handleSubmit} >
              <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter" >
                  Añadir cliente
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={9}>
                              
                                  <FormGroup controlId="cif">
                                      <Form.Label>CIF</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="CIF"
                                        required
                                      />
                                  </FormGroup>
                                  <FormGroup controlId="razon_social">
                                      <Form.Label>Razón social</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="Razón social"
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

                                  <FormGroup controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        required
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