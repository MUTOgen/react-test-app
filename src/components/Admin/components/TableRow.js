import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../../../helpers/Auth'

export default class TableRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      id: props.data.id,
      login: props.data.login,
      password: props.data.password,
    }
  }

  renderEditContols() {
    return (
      <td>
        <a href="#save" className="save-row" onClick={this.handleSaveClick}>
          <i className="fas fa-save" />
        </a>
        &nbsp;
        <a
          href="#cancel"
          className="cancel-row"
          onClick={this.handleCancelClick}
        >
          <i className="fas fa-times-circle" />
        </a>
      </td>
    )
  }

  renderCommonControls() {
    return (
      <td>
        <a href="#edit" className="edit-row" onClick={this.handleEditClick}>
          <i className="fas fa-edit" />
        </a>
        &nbsp;
        <a
          href="#delete"
          className="delete-row"
          onClick={this.handleDeleteClick}
        >
          <i className="fas fa-trash-alt" />
        </a>
      </td>
    )
  }

  handleEditClick = e => {
    e.preventDefault()
    this.setState({ isEdit: true })
  }

  handleCancelClick = e => {
    e.preventDefault()
    this.setState({ isEdit: false })
  }

  handleSaveClick = e => {
    e.preventDefault()
    let { login, password, id } = this.state
    const token = Auth.getToken()

    if (login.trim() === '') {
      alert('Fill the Login')
      return
    }
    axios
      .get(
        `https://us-club.pw/api/edit.php?id=${id}&login=${login}&password=${password}&token=${token}`
      )
      .then(response => {
        const data = response.data
        if ('error' in data) {
          alert(data.error)
          return
        }
        this.setState({ isEdit: false })
      })
  }

  handleDeleteClick = e => {
    e.preventDefault()
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      const token = Auth.getToken()
      axios
        .get(
          `https://us-club.pw/api/delete.php?id=${this.state.id}&token=${token}`
        )
        .then(response => {
          const data = response.data
          if ('error' in data) {
            alert(data.error)
            return
          }
          this.props.onDelete({ id: this.state.id })
        })
    }
  }

  passwordChanged = e => {
    this.setState({ password: e.target.value })
  }

  loginChanged = e => {
    this.setState({ login: e.target.value })
  }

  render() {
    const { id, login, isEdit } = this.state
    return (
      <tr>
        <td className="id-cell">{id}</td>
        <td className="login-cell">
          {!isEdit ? (
            login
          ) : (
            <input
              type="text"
              name="login"
              className="login"
              onChange={this.loginChanged}
              defaultValue={login}
            />
          )}
        </td>
        <td className="password-cell">
          {!isEdit ? (
            '*****'
          ) : (
            <input
              type="password"
              name="password"
              className="password"
              onChange={this.passwordChanged}
              placeholder="Leave empty to save old password"
            />
          )}
        </td>
        {!isEdit ? this.renderCommonControls() : this.renderEditContols()}
      </tr>
    )
  }
}
