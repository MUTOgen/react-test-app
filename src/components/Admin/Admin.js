import React, { Component } from 'react'
import Table from './components/Table'
import './Admin.css'

export default class Admin extends Component {
  render() {
    return (
      <div className="admin-page">
        <Table perPage={5} />
      </div>
    )
  }
}
