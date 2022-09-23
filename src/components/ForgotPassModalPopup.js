import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Snackbar, IconButton} from '@material-ui/core'

export class ForgotPassModalPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {showMessage:false, message:''};

    }

    componentDidMount() 
    {

    }

    messageClose = (event) =>
    {
      this.setState({showMessage:false});
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
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
                
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Aviso
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="container">
                      
                               Pongase en contacto con el servicio de administración de Rodicar o visite 
                                                              <a href="http://www.rodicar.es/"> www.rodicar.es</a>

                  </div>
              </Modal.Body>
            </Modal>

          </div>
          );
    }
}