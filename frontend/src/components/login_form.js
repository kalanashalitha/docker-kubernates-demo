import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: ""
        }
    }
    render() {
        return <form onSubmit={this.login}>
                Name : <input onChange={e => this.setState({ name: e.target.value })}
                    value={this.state.name}
                />
            Password : <input onChange={e => this.setState({ password: e.target.value })}
                    value={this.state.password}
                />
                <button type="submit"> Login </button>
            </form>
    }

    login = event => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            password: this.state.password
        };
        axios.post(`http://localhost:8080/api/user/login`, user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            }, (error) => {
                console.log(error);
            });
    }
}

export default LoginForm;