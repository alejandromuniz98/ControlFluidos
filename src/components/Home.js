import React, {Component} from 'react';
import {ComunCabecera} from './ComunCabecera'
import {ComunPie} from './ComunPie'
import '../css/Comun.css';

export class Home extends Component
{
    render()
    {
        return (
            <div className="Com">
            <div className="container" >
                <ComunCabecera></ComunCabecera>
                <br></br>
                <h3>Esta es la página inicial de administración</h3>
                <br></br>
                <ComunPie></ComunPie>
            </div>
            </div>
        );
    }
}