import React, { Component } from "react";
import CauseDataService from "../services/cause.service";
import { Link } from "react-router-dom";
import "../cause.css"
// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCause_id = this.onChangeSearchCause_id.bind(this);
    this.retrieveCauses = this.retrieveCauses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCause = this.setActiveCause.bind(this);
    this.removeAllCauses = this.removeAllCauses.bind(this);
    this.searchCause_id = this.searchCause_id.bind(this);

    this.state = {
      causes: [],
      currentCause: null,
      currentIndex: -1,
      searchCause: ""
    };
  }

  componentDidMount() {
    this.retrieveCauses();
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

  retrieveCauses() {
    CauseDataService.getAll()
      .then(response => {
        this.setState({
          causes : response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveCauses();
    this.setState({
      currentCause: null,
      currentIndex: -1
    });
  }

  setActiveCause(cause, index) {
    this.setState({
      currentCause: cause,
      currentIndex: index
    });
  }

  removeAllCauses() {
    CauseDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCause_id() {
    CauseDataService.findById(this.state.searchCause_id)
      .then(response => {
        this.setState({
          causes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addCause() {
    window.location="/addcause"
  }

  render() {
    const { searchCause_id, causes, currentCause, currentIndex } = this.state;

    return (
      <body id = "bg">
      <div className="list row" id = "first">
        <div className="col-md-8" id = "third">
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by cause_id"
              id= "fourth"
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
                onClick={this.addCause}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "cause1">
          <h4> List of Causes</h4>

          <ul className="list-group">
            {causes &&
              causes.map((cause, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCause(cause, index)}
                  key={index}
                >
                  {cause.cause_id}
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
          {currentCause ? (
            <div>
              <h4>Cause</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentCause.cause_id}
              </div>
              <div>
                <label>
                  <strong>Type</strong>
                </label>{" "}
                {currentCause.cause_type}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCause.cause_status}
              </div>
              <div>
                <label>
                  <strong>Approver:</strong>
                </label>{" "}
                {currentCause.approver_id}
              </div>
              

              <Link
                to={"/causes/" + currentCause.cause_id}
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