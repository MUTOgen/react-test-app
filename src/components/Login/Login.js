import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

class Login extends Component {
    isEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    validate(login, password){
        if(login.trim() === '' || password.trim() === ''){
            alert('Fill the form. All fields are required')
            return false
        }
        return true
    }
    doRegister = (e) => {
        e.preventDefault()
        let form = e.target
        let login = form.elements[0].value
        let password = form.elements[1].value
        if(!this.isEmail(login)){
            alert('Email is not valid')
            return false
        }
        if(this.validate(login, password)){
            axios.get(`http://aabramoff.ru/api/add.php?login=${login}&password=${password}`).then(response => {
                let data = response.data
                if(data.status === 'error'){
                    alert(data.error);
                }
                if(data.status === 'ok'){
                    form.reset()
                    alert('Success! Now you can login');
                }
            });
        }
    }
    doAuth = (e) => {
        e.preventDefault()
        let login = e.target.elements[0].value
        let password = e.target.elements[1].value

        if(this.validate(login, password)){
            axios.get(`http://aabramoff.ru/api/login.php?login=${login}&password=${password}`).then(response => {
                let data = response.data
                if(data.status === 'error'){
                    alert(data.error)
                    return
                }
                if(data.status === 'ok'){
                    window.localStorage.setItem('login',login)
                    this.props.history.push('/')
                }
            });
        }
    }

    render() {
        return (
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={this.doAuth}>
                    <p><input type="text" name="login" className="login" placeholder="Enter email" /></p>
                    <p><input type="password" name="password" className="password" placeholder="Enter password" /></p>
                    <p><button type="submit">Enter</button></p>
                </form>
                <h2>Registration</h2>
                <form onSubmit={this.doRegister}>
                    <p><input type="text" name="login" className="login" placeholder="Enter email" /></p>
                    <p><input type="password" name="password" className="password" placeholder="Enter password" /></p>
                    <p><button type="submit">Enter</button></p>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);