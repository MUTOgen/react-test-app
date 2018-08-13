import React, { Component } from 'react';
import axios from 'axios';

export default class TableRow extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEdit: false,
            id: props.data.id,
            login: props.data.login,
            password: props.data.password,
        }
    }

    renderEditContols(){
        return (
            <td>
                <a href="#save" className="save-row" onClick={this.handleSaveClick}><i className="fas fa-save"></i></a>&nbsp;
                <a href="#cancel" className="cancel-row" onClick={this.handleCancelClick}><i className="fas fa-times-circle"></i></a>
            </td>
        );
    }

    renderCommonControls(){
        return (
            <td>
                <a href="#edit" className="edit-row" onClick={this.handleEditClick}><i className="fas fa-edit"></i></a>&nbsp;
                <a href="#delete" className="delete-row" onClick={this.handleDeleteClick}><i className="fas fa-trash-alt"></i></a> 
            </td>
        );
    }

    handleEditClick = (e) => {
        e.preventDefault()
        this.setState({isEdit: true})
    }

    handleCancelClick = (e) => {
        e.preventDefault()
        this.setState({isEdit: false})
    }

    handleSaveClick = (e) => {
        e.preventDefault()
        let {login, password, id} = this.state
        const token = window.localStorage.getItem('token')

        if(login.trim() === ''){
            alert('Fill the Login')
            return
        }
        axios.get(`https://us-club.pw/api/edit.php?id=${id}&login=${login}&password=${password}&token=${token}`).then(response => {
            let data = response.data
            if('error' in data){
                alert(data.error)
                return
            }
            this.setState({isEdit: false})
        })
    }

    handleDeleteClick = (e) => {
        e.preventDefault()
        let confirm = window.confirm('Are you sure?')
        if(confirm){
            const token = window.localStorage.getItem('token')
            axios.get(`https://us-club.pw/api/delete.php?id=${this.state.id}&token=${token}`).then(response => {
                let data = response.data
                if('error' in data){
                    alert(data.error)
                    return
                }
                this.props.onDelete({id: this.state.id})
            })
        }
    }

    passwordChanged = (e) => {
        this.setState({password: e.target.value})
    }

    loginChanged = (e) => {
        this.setState({login: e.target.value})
    }

    render() {
        let {id, login, isEdit} = this.state
        return (
            <tr>
                <td className="id-cell">{id}</td>
                <td className="login-cell">
                    { !isEdit ? login : <input type="text" name="login" className="login" onChange={this.loginChanged} defaultValue={login} /> }
                </td>
                <td className="password-cell">
                    { !isEdit ? '*****' : <input type="password" name="password" className="password" onChange={this.passwordChanged} /> }
                </td>
                { !isEdit ? this.renderCommonControls() : this.renderEditContols() }
            </tr>
        );
    }
}