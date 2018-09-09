import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Validator from '../../helpers/Validator'

import './Register.css'

class Register extends Component {
  state = {
    login: null,
    password: null,
    repassword: null,
  }

  changeLogin = e => {
    this.setState({ login: e.target.value })
  }
  changePassword = e => {
    this.setState({ password: e.target.value })
  }
  changeRePassword = e => {
    this.setState({ repassword: e.target.value })
  }
  validate(login, password) {
    if (login.trim() === '' || password.trim() === '') {
      alert('Fill the form. All fields are required')
      return false
    }
    return true
  }
  doRegister = e => {
    e.preventDefault()
    let { login, password, repassword } = this.state
    let form = e.target
    if (!Validator.isEmail(login)) {
      alert('Email is not valid')
      return false
    }
    if (password !== repassword) {
      alert('Passwords are not matched')
      return
    }
    if (this.validate(login, password)) {
      axios
        .get(
          `https://us-club.pw/api/add.php?login=${login}&password=${password}`
        )
        .then(response => {
          let data = response.data
          if (data.status === 'error') {
            alert(data.error)
          }
          if (data.status === 'ok') {
            form.reset()
            alert('Success! Now you can login')
          }
        })
    }
  }

  render() {
    return (
      <div className="register-form">
        <h2>Registration</h2>
        <form onSubmit={this.doRegister}>
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
            <input
              type="password"
              name="re-password"
              className="re-password"
              placeholder="Repeat password"
              onChange={this.changeRePassword}
            />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>
        </form>
        <p>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </p>
      </div>
    )
  }
}

export default Register
