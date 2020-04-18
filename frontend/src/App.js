/* global gapi */
import React from 'react';
import LoginForm from './LoginForm';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  contructor(props) {
    //super(props)
    this.auth2
    this.userName
    this.userIdToken
    this.googleAuthObject
    this.gapi
    this.state = {
      isSignedIn: false,
    }
    // this.signOut = this.signOut.bind(this);
  }

  /*Welcome(props){
    return <h1>hi, {props.name}</h1>
  }*/

  render() {
      const signupForm = (<div>
                <b>sign up form</b><br/>
                enter your details here!
                </div>);

                //const newElement = <Welcome name="kalana"/>
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>You are not signed</p>
          <div id="google-login-button" class="g-signin2" onClick={this.googleInit}>login</div>
          <button href="#" onClick={() => { this.signOut() }}>Sign out...</button>
        </header>
        <button href="#" onClick={() => { this.createUser() }}>create user</button>
        {signupForm}<br/>
        <LoginForm name="kalana shalitha"/>
      </div>
    );
  }

  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, youre signedin </p>
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
        </div>
      )
    }

  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out');
    });
  }
  async authenticateUser(loggedInUser) {
    const response = await fetch('api/user/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: loggedInUser['Zi']['id_token'],
    });
    const myJson = await response.json();
    console.log(JSON.stringify(myJson));
  }

  async createUser() {
      const response = await fetch('api/user/create', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const myJson = await response.json();
      console.log(JSON.stringify(myJson));
    }
  googleInit = () => {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.getAuthInstance({
        client_id: '968290368770-41286pviqm741nh77i2e7bcvc81p45qd.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile',
        hosted_domain: "localhost"
      }).then(auth2 => { // wait for initialisation
        if (!auth2.isSignedIn.get()) { // check if already signed in
          auth2.signIn().then(user => {
            this.authenticateUser(user);
          })
        }
      })/*.then((googleAuthObject) => {
        this.googleAuthObject = googleAuthObject
        let options = new gapi.auth2.SigninOptionsBuilder();
        options.setAppPackageName('com.web.mapap');
        options.setPrompt('select_account');
        options.setScope('profile').setScope('email');
        this.googleAuthObject.signIn(options)
        .then(googleUser => this.authenticateUser(googleUser))
      },
      (e)=>{ 
        console.log(e)
      })*/
      //this.attachSignin(document.getElementById('google-login-button'));
    });
  }

  onSignIn(googleUser) {
    //console.log(JSON.stringify(googleUser))
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  onSuccess() {
    this.setState({
      isSignedIn: true
    })
  }
}

export default App;
