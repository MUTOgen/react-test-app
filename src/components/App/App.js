import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Home from "../Home/Home";
import Admin from "../Admin/Admin";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  static isLoginUser(name){
    const user = window.localStorage.getItem('login');
    if(name === undefined){
      return user ? true : false;
    }else{
      return user === name ? true : false;
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <ul className="menu">
          { App.isLoginUser() && <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li> }
          { App.isLoginUser('admin') && <li><NavLink to='/admin' activeClassName='active'>Admin</NavLink></li> }
          { !App.isLoginUser() && <li><NavLink to='/login' activeClassName='active'>Login</NavLink></li> }
          { App.isLoginUser() && <li><NavLink to='/logout' activeClassName='active'>Logout</NavLink></li> }
        </ul>
        <div className="app-content">
          <Switch>
            <Route exact path='/' render={() => App.isLoginUser() ? <Home /> : <Redirect to='/login' />} />
            <Route path='/admin' render={() => App.isLoginUser('admin') ? <Admin /> : <Redirect to='/' />} />
            <Route path='/login' render={() => !App.isLoginUser() ? <Login /> : <Redirect to='/' />} />
            <Route path='/logout' render={() => App.isLoginUser() ? <Logout /> : <Redirect to='/login' />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;