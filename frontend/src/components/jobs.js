import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';

class Jobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            userId: props.userId,
            jobs: [{
                title: "a",
                description: "b",
                userId: props.userId
            }]
        }
    }
    render() {
        return <div>
            <form onSubmit={this.saveJob}>
                Title : <input onChange={e => this.setState({ title: e.target.value })}
                    value={this.state.title}
                />
            Description : <input onChange={e => this.setState({ description: e.target.value })}
                    value={this.state.description}
                />
                <button type="submit"> Save Job </button>
            </form>
            <ul>
                {this.state.jobs.map((value, index) => {
                    return <li key={index}>
                        {value.title} <br />
                        {value.description}
                    </li>
                })}
            </ul>
        </div>
    }

    saveJob = event => {
        event.preventDefault();
        const job = {
            title: this.state.title,
            description: this.state.description,
            userId: this.state.userId
        };
        axios.post(`http://localhost:8080/api/user/login`, job)
            .then((res) => {
                console.log(res);
                this.props.setLoggedInUser(res.data)
            }, (error) => {
                console.log(error);
            });
    }
}

export default Jobs;