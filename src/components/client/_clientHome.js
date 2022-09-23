import React, {Component} from 'react';
import {ClientComunCabecera} from './_clientComunCabecera'
import {ComunPie} from '../ComunPie'
import '../../css/Comun.css';

export class clientHome extends Component
{
    render()
    {
        return (
            <div className="Com">
            <div className="container" >
                <ClientComunCabecera></ClientComunCabecera>
                <br></br>
                <h3>Esta es la página inicial del cliente</h3>
                <br></br>
                <ComunPie></ComunPie>
            </div>
            </div>
        );
    }
}