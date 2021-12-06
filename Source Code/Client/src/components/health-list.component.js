import React, { Component } from "react";
import HealthDataService from "../services/health.service";
import { Link } from "react-router-dom";
import '../health.css';
// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCause_id = this.onChangeSearchCause_id.bind(this);
    this.retrieveHealths = this.retrieveHealths.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveHealth = this.setActiveHealth.bind(this);
    this.removeAllHealths = this.removeAllHealths.bind(this);
    this.searchCause_id = this.searchCause_id.bind(this);

    this.state = {
      healths: [],
      currentHealth: null,
      currentIndex: -1,
      searchHealth: ""
    };
  }

  componentDidMount() {
    this.retrieveHealths();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchCause_id(e) {
    const searchCause_id = e.target.value;

    this.setState({
      searchCause_id: searchCause_id
    });
  }

  retrieveHealths() {
    HealthDataService.getAll()
      .then(response => {
        this.setState({
          healths: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveHelaths();
    this.setState({
      currentHealth: null,
      currentIndex: -1
    });
  }

  setActiveHealth(health, index) {
    this.setState({
      currentHealth: health,
      currentIndex: index
    });
  }

  removeAllHealths() {
    HealthDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        alert(e);
      });
  }

  searchCause_id() {
    HealthDataService.findById(this.state.searchCause_id)
      .then(response => {
        this.setState({
          healths: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }
  addHealth() {
    window.location="/addhealth"
  }

  render() {
    const { searchCause_id, healths, currentHealth, currentIndex } = this.state;

    return (
      <body id ="bg">
      <div className="list row" id = "first">
        <div className="col-md-8" id = "third">
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID of the Cause"
              id = "fourth"
              value={searchCause_id}
              onChange={this.onChangeSearchCause_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchCause_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addHealth}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "health1">
          <h4>List of Health Causes </h4>

          <ul className="list-group">
            {healths &&
              healths.map((health, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveHealth(health, index)}
                  key={index}
                >
                  {health.cause_id}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentHealth ? (
            <div>
              <h4>Health</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentHealth.cause_id}
              </div>
              <div>
                <label>
                  <strong>Organisation Name:</strong>
                </label>{" "}
                {currentHealth.org_name}
              </div>
              <div>
                <label>
                  <strong>Need Type :</strong>
                </label>{" "}
                {currentHealth.need_type}
              </div>
              <div>
                <label>
                  <strong>Need Quantity</strong>
                </label>{" "}
                {currentHealth.need_quantity}
              </div>
              <div>
                <label>
                  <strong>Name (point of contact)</strong>
                </label>{" "}
                {currentHealth.poc_name}
              </div>
              <div>
                <label>
                  <strong>Contact (point of contact)</strong>
                </label>{" "}
                {currentHealth.poc_contact}
              </div>
             

              <Link
                to={"/healths/" + currentHealth.cause_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Cause</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}