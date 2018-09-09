import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Auth from '../../helpers/Auth'

class Logout extends Component {
  render() {
    Auth.removeUser()
    this.props.onLogout()
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }
}

Logout.propTypes = {
  onLogout: propTypes.func.isRequired,
}

export default Logout
