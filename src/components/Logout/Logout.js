import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    render() {
        window.localStorage.removeItem('login');
        
        return (
            <div>
                <Redirect to='/' />
            </div>
        );
    }
}