import RegisterForm from './components/register_form';
import MapContainer from './components/map';
import LoginForm from './components/login_form';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "kalana" }
  }
  render() {
    return <div className="App">
        <RegisterForm email="kalana@gmail.com"/> <br/>
        <LoginForm />
        <MapContainer />
      </div>
  }
}

export default App;
