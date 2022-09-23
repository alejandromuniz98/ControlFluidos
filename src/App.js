    import React, {Component} from 'react';

    import {Home} from './components/Home'
    import {Usuarios} from './components/Usuarios'
    import {Clientes} from './components/Clientes'
    import {Ordenes} from './components/Ordenes'
    import {Depositos} from './components/Depositos'
    import {Pistolas} from './components/Pistolas'
    import {Aceites} from './components/Aceites'
    import {Login} from './components/Login'
    import {Paises} from './components/Paises'
    import {Talleres} from './components/Talleres'

    import {BrowserRouter, Route, Switch} from 'react-router-dom'

    import './App.css';

    import {clientHome} from './components/client/_clientHome'
    import {ClientUsuarios} from './components/client/_clientUsuarios'
    import {ClientOrdenes} from './components/client/_clientOrdenes'
    import {ClientTalleres} from './components/client/_clientTalleres'
    import {ClientAceites} from './components/client/_clientAceites'
    import {ClientDepositos} from './components/client/_clientDepositos'
    import {ClientPistolas} from './components/client/_clientPistolas'

    class App extends Component 
    {


      render() 
      {
        return(
          <BrowserRouter>
            
              <Switch>
                <Route path='/' component={Login} exact/>
                <Route path='/admin' component={Home} exact/>
                <Route path='/usuarios' component={Usuarios} exact/>
                <Route path='/clientes' component={Clientes} exact/>
                <Route path='/ordenes'  component={Ordenes} exact/>
                <Route path='/depositos' component={Depositos} exact/>
                <Route path='/pistolas' component={Pistolas} exact/>
                <Route path='/aceites' component={Aceites} exact/>
                <Route path='/paises' component={Paises} exact/>
                <Route path='/talleres' component={Talleres} exact/>

                <Route path='/home' component={clientHome} exact/>
                <Route path='/cliente/usuarios' component={ClientUsuarios} exact/>
                <Route path='/cliente/ordenes' component={ClientOrdenes} exact/>
                <Route path='/cliente/talleres' component={ClientTalleres} exact/>
                <Route path='/cliente/fluidos' component={ClientAceites} exact/>
                <Route path='/cliente/depositos' component={ClientDepositos} exact/>
                <Route path='/cliente/pistolas' component={ClientPistolas} exact/>
              </Switch>
            <br></br>
          </BrowserRouter>


        );

      }
    }

    export default App;