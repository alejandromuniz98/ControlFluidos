import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter } from 'mdbreact';

import {Button, Form, FormGroup} from 'react-bootstrap';
import '../css/Login.css';
import logo from '../images/logo_pie.png';
import Singleton from './Singleton'

import {ForgotPassModalPopup} from './ForgotPassModalPopup';

import {Redirect} from 'react-router-dom'




export  class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {clientes:[],usuarios:[],addModalShow: false};

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    state={
      redirect:false,
      redirectAdmin:false
    }
    componentDidMount() 
    {
      let Sing= Singleton.getInstance();
        fetch(Sing.getUrlClientes())
        .then(res => res.json())
        .then(data => 
        {
        this.setState({clientes: data})
      })
      .catch(console.log)


      fetch(Sing.getUrlUsuarios())
      .then(res => res.json())
      .then(data => 
      {
      this.setState({usuarios: data})
    })
    .catch(console.log)


    }

    handleSubmit(event) 
    {

// eslint-disable-next-line
      if(event.target.myCIF.value=="ADMIN"){
        // eslint-disable-next-line
        if(event.target.myUser.value=="ADMIN"){
          // eslint-disable-next-line
          if(event.target.myPass.value=="ADMIN"){
            localStorage.setItem("NombreCliente","Administrador Rodicar") 
            this.setState({redirectAdmin:true});
            
          }
        }
      }


             for(let cliente of this.state.clientes){
               // eslint-disable-next-line
                if(cliente.CIF==event.target.myCIF.value){
                  localStorage.setItem("idCliente",cliente.id_cliente)
                  
                  // eslint-disable-next-line
                  if("ADMIN"==event.target.myUser.value){
                    // eslint-disable-next-line
                    if(cliente.password==event.target.myPass.value){
                      localStorage.setItem("NombreCliente","Administrador "+cliente.nombre) 
                      localStorage.setItem("ROL",1)
                      this.setState({redirect:true});

                    }
                  }

                  else{
                  for(let usuario of this.state.usuarios){
                    // eslint-disable-next-line
                    if(usuario.id_usuario_cliente==event.target.myUser.value){
                      // eslint-disable-next-line
                      if(usuario.password==event.target.myPass.value){
                        localStorage.setItem("NombreCliente",usuario.nombre+" "+usuario.apellidos) 
                        localStorage.setItem("ROL",usuario.rol)
                        this.setState({redirect:true});
                  }
                }
            } 
          }

          }
        }

      }



    render() {
      let addModalClose = () => this.setState({addModalShow: false})
      const {redirectAdmin}=this.state
      if(redirectAdmin){
        return <Redirect to ="/admin"/>
      }
      const {redirect}=this.state
      if(redirect){
        return <Redirect to ="/home"/>
      }

        return (
          
          <div className="loginDiv">
            <MDBContainer className="loginContainer">
            <MDBRow>
              <MDBCol md="6" className="loginCol">
                <MDBCard className="loginCard">
                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                      <img src={logo}/>
                      </h3>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                    <div className="grey-text">
                    <FormGroup controlId="myCIF" >
                            <Form.Label>CIF</Form.Label>
                            <Form.Control
                             type="text"
                             name="myCIF"
                            required         
                         />
                    </FormGroup>
                    <FormGroup controlId="myUser" >
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                             type="text"
                             name="myUser"
                            required         
                         />
                    </FormGroup>
                    <FormGroup controlId="myPass">
                        <Form.Label>Contraseña</Form.Label>
                         <Form.Control
                             type="password"
                             name="myPass"
                         />
                    </FormGroup>
                    </div>
                    <div className="text-center mb-3">
                      <Button variant="primary" type="submit" className="btn-block z-depth-1a">Iniciar Sesion</Button>
                    </div>
                    </Form>
                    
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                      <a href="#" onClick={()=> this.setState({addModalShow: true})}>¿Olvidaste la contraseña?
                      </a>
                    </p>

                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <ForgotPassModalPopup 
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                />
          </div>
        );
    }
}