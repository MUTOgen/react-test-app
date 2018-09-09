import { Component } from 'react'

class Validator extends Component {
  static isEmail = email => {
    const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    return regex.test(email)
  }
}

export default Validator
