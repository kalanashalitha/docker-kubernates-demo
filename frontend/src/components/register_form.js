import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "kalana",
            password: "pass",
            email: props.email
        }
    }
    render() {
        return <form onSubmit={this.save}>
                Name : <input onChange={e => this.setState({ name: e.target.value })}
                    value={this.state.name}
                />
            Password : <input onChange={e => this.setState({ password: e.target.value })}
                    value={this.state.password}
                />
            Email : {this.state.email}
                <button type="submit"> Save </button>
            </form>
    }

    save = event => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios.post(`http://localhost:8080/api/user/register`, user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            }, (error) => {
                console.log(error);
            });
    }
}

export default RegisterForm;