import React, { Component } from "react";
import LoginDataService from "../services/login.service";
import '../employee.css';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      username:"",
      email:"",
      password: "",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
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

  saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    LoginDataService.register(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          submitted: true
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  newUser() {
    this.setState({
        username:"",
        email:"",
        password: "",
        submitted: false
    });
  }

  render() {
    return (
      <body id = "bg">
        <div className="submit-form" id ="second"> 
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/users'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  name="username"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Email</label>
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

              <div className="form-group">
                <label htmlFor="title">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                />
              </div>

  
              <button onClick={this.saveUser} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}