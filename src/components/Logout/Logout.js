import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    render() {
        window.localStorage.removeItem('login')
        window.localStorage.removeItem('token')

        return (
            <div>
                <Redirect to='/' />
            </div>
        );
    }
}