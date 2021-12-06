import '../login.css';
import React, { Component } from "react";
import LoginDataService from "../services/login.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      email:"",
      password:"",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  login() {
    console.log("entered login function in componenet");
    var data = {
      email: this.state.email,
      password: this.state.password,
    };

    LoginDataService.login(data)
      .then(response => {
        this.setState({
          email: response.data.email,
          password: response.data.password,
        });
        sessionStorage.setItem("login", true)
        window.location = "/"
        console.log(response.data);
      })
      .catch(e => {
        alert(`Err: ${e.message}`);
        sessionStorage.setItem("login", false)
      });
  }

  render() {
    return (
      <body id = "bg">
      <div className="main" id = "loginf">
        <h1 className="login" id = "fontl">LOGIN</h1>
        <div className="submit-form" id = "forml1"> 
          {this.state.submitted ? (
            <div>
              <h4>You logged in successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/employees'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form1" >
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                  
                />
              </div>
  
              <div className="form-group" id = "form1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                />
              </div>
  
              <button onClick={this.login} className="mt-3 btn btn-success" id = "button">
                Login
              </button>
            </div>
          )}
        </div>
        </div>
        </body>
      );
  }
}