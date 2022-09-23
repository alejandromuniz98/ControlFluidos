import React, { Component } from "react";
import '../../css/Login.css';
import logo from '../../images/logo_pie.png';

import {ClientNavigation} from './_clientNavigation'

import '../../css/ComunCabecera.css';


export  class ClientComunCabecera extends Component {
      render() 
      {
        return(

        <div className="ComunCabecera">
            <img  src={logo}/>
            <h3 className="">Gestor de pistolas inteligentes</h3>


            <ClientNavigation></ClientNavigation>
            </div>
                    );

                }
              }
          
              export default ClientComunCabecera;