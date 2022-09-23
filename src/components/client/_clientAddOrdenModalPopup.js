import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'
import Singleton from '../Singleton'


export class AddOrdenModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {aceites: [], usuarios:[],clientes:[], radio :1, showMessage:false, message:''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    onClick = nr => () => {
      this.setState({
        radio: nr
      });
    }




    componentDidMount() 
    {
      let Sing= Singleton.getInstance();
      fetch(Sing.getUrlAceites()+"/"+localStorage.getItem("idCliente"))
      .then(res => res.json())
      .then(data => 
      {
        this.setState({aceites: data})
      })
      .catch(console.log)


      fetch(Sing.getUrlUsuarios()+"/"+localStorage.getItem("idCliente"))
      .then(res => res.json())
      .then(data => {
          this.setState({ usuarios: data })
      })
      .catch(console.log) 

      
      
  fetch(Sing.getUrlClientes()+"/"+localStorage.getItem("idCliente"))
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

    handleChange(event){

    }



    handleSubmit(event)
    {
      event.preventDefault();
      let Sing= Singleton.getInstance();
      let id_ac=event.target.id_aceite.value;
      let id_or_cl= event.target.id_orden_cliente.value;
      let id_us=event.target.id_usuario.value;
      let li=event.target.litros_preseleccion.value;
      let km=event.target.kms.value;
      let mat=event.target.matricula.value;

      if(this.state.radio===1){
        id_us="nulo";
      }

      fetch(Sing.getUrlOrdenes()+"/"+localStorage.getItem("idCliente"), 
      {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id_aceite: id_ac,
          id_orden_cliente: id_or_cl,
          id_usuario: id_us,
          litros_preseleccion: li,
          matricula: mat,
          kms: km
        })
      })

      .then(response => response.json())
      .then(response => 
      {
        
          if (response.code==200) 
          {
            this.setState({ showMessage: true, message: 'Datos enviados correctamente' });
          }
          else
          {

            this.setState({ showMessage: true, message: 'Error enviando datos:'+' '+response.mes});
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
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Nueva Orden
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      <Row>
                          <Col sm={6}>
                              
                                  <FormGroup controlId="id_orden_cliente">
                                      <Form.Label>ID Orden</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="id_orden_cliente"
                                        required
                                      />
                                  </FormGroup>
                                 
                                  <FormGroup controlId="litros_preseleccion">
                                      <Form.Label>Preselección (Litros)</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_preseleccion"
                                        min="0"
                                        defaultValue="0"  
                                        step="0.01"                                      
                                      />
                                  </FormGroup>


                                  <FormGroup controlId="matricula">
                                      <Form.Label>Matrícula</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="matricula"
                                      />
                                  </FormGroup>
                                 
                                  <FormGroup controlId="kms">
                                      <Form.Label>Kilómetros</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="kms"
                                        min="0" 
                                        step="1"  
                                        defaultValue="0"                                     
                                      />
                                  </FormGroup>
                          </Col>
                          <Col>
                                  Usuario:
                                  <br></br>
                                  <FormGroup>
                                  <div className="radio" >
                                    <label>
                                      <input type="radio" value="1" onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false}/>
                                      Cualquiera
                                    </label>
                                  </div>
                                  <div className="radio">
                                    <label>
                                      <input type="radio" value="2" onClick={this.onClick(2)}  checked={this.state.radio===2 ? true : false}/>
                                      Seleccionar
                                    </label>
                                    <FormGroup controlId="id_usuario">
                                            <Form.Control as="select" disabled={this.state.radio===1 ? true : false}>
                                                {this.state.usuarios.map(usuario =>
                                                    <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                                        {usuario.nombre} {usuario.apellidos}
                                                    </option>
                                                )}
                                            </Form.Control>
                                  </FormGroup>
                                  </div>
                                  </FormGroup>

                                  
                                  <FormGroup controlId="id_aceite">
                                    <Form.Label>Fuido</Form.Label>
                                    <Form.Control as="select">
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
                  <Button variant="primary" type="submit">Añadir</Button>
              </Modal.Footer>
              </Form>
            </Modal>

          </div>
          );
    }
}