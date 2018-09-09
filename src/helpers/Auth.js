import { Component } from 'react'
import Cookie from './Cookie'

class Auth extends Component {
  static getUser() {
    return Cookie.getCookie('login')
  }

  static getToken() {
    return Cookie.getCookie('token')
  }

  static putUser(login, token) {
    Cookie.setCookie('login', login, { expires: 3600 })
    Cookie.setCookie('token', token, { expires: 3600 })
  }

  static removeUser() {
    Cookie.deleteCookie('login')
    Cookie.deleteCookie('token')
  }
}

export default Auth
