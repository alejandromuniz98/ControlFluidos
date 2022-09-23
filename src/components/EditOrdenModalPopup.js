import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Snackbar, IconButton } from '@material-ui/core'
import Singleton from './Singleton'

import Select from 'react-select';

export class EditOrdenModalPopup extends Component 
{
    constructor(props) {
        super(props);
        this.state = { aceites: [],usuarios:[],clientes:[],radio:1,showMessage: false, message: '',selected_user:[],selected_fluido:[],selected_client:[] };
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onClick = nr => () => {
        this.setState({
            
          radio: nr
        });
      }

    componentDidMount() {
        let Sing= Singleton.getInstance();
        fetch(Sing.getUrlAceites())
            .then(res => res.json())
            .then(data => {
                this.setState({ aceites: data })
            })
            .catch(console.log)

        fetch(Sing.getUrlUsuarios())
            .then(res => res.json())
            .then(data => {
                this.setState({ usuarios: data })
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
        let Sing= Singleton.getInstance();

        let id_ac=this.state.selected_fluido.value;
        let id_cl=this.state.selected_client.value;
        let id_us=this.state.selected_user.value;
        let li=event.target.litros_preseleccion.value;
        let km=event.target.kms.value;
        let mat=event.target.matricula.value;

        if(this.state.radio===1){
            id_us="nulo";
          }else{
            if(id_us==null){
              id_us=this.props.id_usuario
            }
          }
        
    
          if(id_ac==null){
            id_ac=this.props.id_aceite
          }
          if(id_cl==null){
            id_cl=this.props.id_cliente
          }

        fetch(Sing.getUrlOrdenes(),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_aceite: id_ac,
                    id_cliente: id_cl,
                    id_orden: this.props.id_orden,
                    id_usuario: id_us,
                    litros_preseleccion: li,
                    kms_vehiculo: km,
                    matricula:mat
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
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Orden
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
                                        disabled
                                        defaultValue={this.props.id_orden_cliente}
                                      />
                                  </FormGroup>
                                 
                                  <FormGroup controlId="litros_preseleccion">
                                      <Form.Label>Preselección (Litros)</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="litros_preseleccion"
                                        min="0"
                                        step="0.01"
                                        defaultValue={this.props.litros_preseleccion}                                      
                                      />
                                  </FormGroup>


                                  <FormGroup controlId="matricula">
                                      <Form.Label>Matrícula</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="matricula"
                                        defaultValue={this.props.matricula}
                                      />
                                  </FormGroup>
                                 
                                  <FormGroup controlId="kms">
                                      <Form.Label>Kilómetros</Form.Label>
                                      <Form.Control
                                        type="number"
                                        name="kms"
                                        min="0"
                                        step="0.01"
                                        defaultValue={this.props.kms}                                      
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
                                  <Select 
                                  id="id_usuario"
                                  options= {this.state.usuarios}
                                  onChange={e => this.setState({selected_user: e})}
                                  selectedValue={this.state.selectedValue}
                                  placeholder="Seleccionar usuario..."
                                  defaultValue={this.props.usuario_nombre==null ? {label:"",value:null} : { label: this.props.usuario_nombre+" "+this.props.usuario_apellido+"-"+this.props.cliente_nombre, value: this.props.id_usuario }}
                                  isDisabled={this.state.radio===1 ? true : false}
                                  />

                                  </FormGroup>
                                  </div>
                                  </FormGroup>

                                  
                                  <FormGroup controlId="id_cliente">
                                    <Form.Label>Cliente</Form.Label>
                                  <Select 
                                  id="id_cliente"
                                  options= {this.state.clientes}
                                  onChange={e => this.setState({selected_client: e})}
                                  selectedValue={this.state.selectedValue}
                                  placeholder="Seleccionar cliente..."
                                  defaultValue={{ label: this.props.cliente_nombre, value: this.props.id_cliente }}
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
                                  defaultValue={{ label: this.props.nombre_aceite+"-"+this.props.cliente_nombre, value: this.props.id_aceite }}
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