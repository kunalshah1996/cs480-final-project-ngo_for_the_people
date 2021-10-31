// import React from 'react';
// import '../login.css';
// import LoginDataService from "../services/login.service";

// export default function Login() {
//   return(
//     <div className="login-wrapper">
//       <h1>Please Log In</h1>
//     <form>
//       <label>
//         <p>Username</p>
//         <input type="text" />
//       </label>
//       <label>
//         <p>Password</p>
//         <input type="password" />
//       </label>
//       <div>
//         <button type="submit">Submit</button>
//       </div> 
//     </form>
//     </div>
//   )
// }
import React, { Component } from "react";
import LoginDataService from "../services/login.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      username:"",
      password:"",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  login() {
    var data = {
      username: this.state.username,
      password: this.state.password,
    };

    LoginDataService.create(data)
      .then(response => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You logged in successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/employees'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
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
                <label htmlFor="description">Password</label>
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
  
              <button onClick={this.login} className="mt-3 btn btn-success">
                login
              </button>
            </div>
          )}
        </div>
      );
  }
}