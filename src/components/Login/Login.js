import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../helpers/Auth'

import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: null,
      password: null,
    }
  }

  changeLogin = e => {
    this.setState({ login: e.target.value })
  }
  changePassword = e => {
    this.setState({ password: e.target.value })
  }
  validate(login, password) {
    if (login.trim() === '' || password.trim() === '') {
      alert('Fill the form. All fields are required')
      return false
    }
    return true
  }
  doAuth = e => {
    e.preventDefault()
    let { login, password } = this.state

    if (this.validate(login, password)) {
      axios
        .get(
          `https://us-club.pw/api/login.php?login=${login}&password=${password}`
        )
        .then(response => {
          let data = response.data
          if (data.status === 'error') {
            alert(data.error)
            return
          }
          if (data.status === 'ok') {
            Auth.putUser(login, data.item.token)
            this.props.onLogin(login, data.item.token)
            this.props.history.push('/')
          }
        })
    }
  }

  render() {
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.doAuth}>
          <p>
            <input
              type="text"
              name="login"
              className="login"
              placeholder="Enter email"
              onChange={this.changeLogin}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Enter password"
              onChange={this.changePassword}
            />
          </p>
          <p>
            <button type="submit">Enter</button>
          </p>
        </form>
        <p>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </p>
      </div>
    )
  }
}

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
}

export default withRouter(Login)
