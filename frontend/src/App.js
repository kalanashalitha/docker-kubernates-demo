import RegisterForm from './components/register_form';
import MapContainer from './components/map';
import LoginForm from './components/login_form';
import Jobs from './components/jobs';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      userId: ""
    }
  }
  componentDidMount(prevProps) {
    console.log("aa")
    // Typical usage (don't forget to compare props):
    this.loadJobs()
  }
  setLoggedInUser = (userData) => {
    this.setState({
      userId: userData.userId,
      username: userData.name
    });
  }
  updateMarkers = (markers) => {
    this.setState({
      userId: this.props.userId,
      markers: markers
    });
  }
  loadJobs() {
    axios.get(`http://localhost:8080/api/job/all-jobs`)
      .then((res) => {
        console.log(JSON.stringify(res));
        this.setState({
          jobs: res.data
        });
      }, (error) => {
        console.log(error);
      });
  }
  render() {
    return <div className="App">
      <b>{this.state.username} is logged in.</b> <br />
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/login">Login And Register</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/jobs">
            <Jobs userId={this.state.userId} />
          </Route>
          <Route path="/map">
            <MapContainer userId={this.state.userId} jobs={this.state.jobs} />
          </Route>
          <Route path="/">
            <RegisterForm email="kalana@gmail.com" /> <br />
            <LoginForm setLoggedInUser={this.setLoggedInUser} /> <br />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  }
}

export default App;
