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
      userId: "",
      markers: []
    }
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
  saveMarkers = event => {
    event.preventDefault();
    const markersDTO = {
      userId: this.state.userId,
      markers: this.state.markers
    };
    console.log(JSON.stringify(markersDTO))
    console.log(this.state.userId)
    axios.post(`http://localhost:8080/api/marker/save-markers`, markersDTO)
      .then((res) => {
        console.log(res);
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
            <button onClick={this.saveMarkers}> Save Markers </button> <br />
            <MapContainer updateMarkers={this.updateMarkers} />
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
