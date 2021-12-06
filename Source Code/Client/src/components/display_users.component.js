import React, { Component } from "react";
import LoginDataService from "../services/login.service";
import { Link } from "react-router-dom";
import '../employee.css';
// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }


  retrieveUsers() {
    LoginDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  registerUser() {
    window.location="/register_user"
  }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <body id ="bg">
      <div className="list row" id ="first">
        <div className="col-md-8" id = "third">
          <div className="input-group mb-3" id = "search">
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.registerUser}
              >
              Register
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id ="user1">
          <h4>List of Users</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentUser.id}
              </div>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}