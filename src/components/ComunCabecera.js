import React, { Component } from "react";
import '../css/Login.css';
import logo from '../images/logo_pie.png';

import {Navigation} from './Navigation'

import '../css/ComunCabecera.css';


export  class ComunCabecera extends Component {
      render() 
      {
        return(

        <div className="ComunCabecera">
            <img  src={logo}/>
            <h3 className="">Administración de pistolas inteligentes</h3>


            <Navigation></Navigation>
            </div>
                    );

                }
              }
          
              export default ComunCabecera;
