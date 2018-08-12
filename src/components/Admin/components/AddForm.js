import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

class AddForm extends Component {
    doAdd = (e) => {
        e.preventDefault()
        let form = e.target
        let login = form.elements[0].value
        let password = form.elements[1].value

        if(login.trim() === '' || password.trim() === ''){
            alert('Fill the form. All fields are required')
            return
        }

        axios.get(`http://aabramoff.ru/api/add.php?login=${login}&password=${password}`).then(response => {
            let data = response.data
            if(data.status === 'error'){
                alert(data.error)
            }
            if(data.status === 'ok'){
                this.props.onAdd({id: data.item.id, login: login, password: password})
                form.reset()
                alert('New item added!')
            }
        })
    }

    render() {
        return (
            <div className="add-form">
                <h2>Add form</h2>
                <form onSubmit={this.doAdd}>
                    <p><input type="text" name="login" className="login" placeholder="Enter new email" /></p>
                    <p><input type="password" name="password" className="password" placeholder="Enter new password" /></p>
                    <p><button type="submit">Save</button></p>
                </form>
            </div>
        );
    }
}

AddForm.propTypes = {
    onAdd: propTypes.func.isRequired
}

export default AddForm