import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from "../Home/Home";
import Admin from "../Admin/Admin";
import Login from "../Login/Login";
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ul className="menu">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
