import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Logout from '../Logout/Logout'
import Auth from '../../helpers/Auth'
import logo from '../../logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: Auth.getUser(),
      token: Auth.getToken(),
    }
  }

  onLogin = (name, token) => {
    this.setState({ user: name, token: token })
  }

  onLogout = () => {
    this.setState({ user: undefined, token: undefined })
  }

  render() {
    let user = this.state.user
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <ul className="menu">
          {user !== undefined && (
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
          )}
          {user === 'admin' && (
            <li>
              <NavLink to="/admin" activeClassName="active">
                Admin
              </NavLink>
            </li>
          )}
          {user === undefined && (
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          )}
          {user !== undefined && (
            <li>
              <NavLink to="/logout" activeClassName="active">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
        <div className="app-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                user !== undefined ? <Home /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/admin"
              render={() =>
                user !== undefined && user === 'admin' ? (
                  <Admin />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/login"
              render={() =>
                user === undefined ? (
                  <Login onLogin={this.onLogin} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/register"
              render={() =>
                user === undefined ? <Register /> : <Redirect to="/" />
              }
            />
            <Route
              path="/logout"
              render={() =>
                user !== undefined ? (
                  <Logout onLogout={this.onLogout} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
