import React, { Component } from "react";
import ReceiverDataService from "../services/receiver.service";
import { Link } from "react-router-dom";
import '../receiver.css';
// export default ReceiverList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCause_id = this.onChangeSearchCause_id.bind(this);
    this.retrieveReceivers = this.retrieveReceivers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveReceiver = this.setActiveReceiver.bind(this);
    this.removeAllReceivers = this.removeAllReceivers.bind(this);
    this.searchCause_id = this.searchCause_id.bind(this);

    this.state = {
      receivers: [],
      currentReceiver: null,
      currentIndex: -1,
      searchReceiver: ""
    };
  }

  componentDidMount() {
    this.retrieveReceivers();
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

  retrieveReceivers() {
    ReceiverDataService.getAll()
      .then(response => {
        this.setState({
          receivers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveReceivers();
    this.setState({
      currentReceiver: null,
      currentIndex: -1
    });
  }

  setActiveReceiver(receiver, index) {
    this.setState({
      currentReceiver: receiver,
      currentIndex: index
    });
  }

  removeAllReceivers() {
    ReceiverDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCause_id() {
    ReceiverDataService.findById(this.state.searchCause_id)
      .then(response => {
        this.setState({
          receivers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addReceiver() {
    window.location="/addreceiver"
  }

  render() {
    const { searchCause_id , receivers, currentReceiver, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by cause_id"
              value={searchCause_id}
              onChange={this.onChangeSearchCause_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
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
                onClick={this.addReceiver}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6">
          <h4>Receivers List</h4>

          <ul className="list-group">
            {receivers &&
              receivers.map((receiver, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveReceiver(receiver, index)}
                  key={index}
                >
                  {receiver.cause_id}
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
          {currentReceiver ? (
            <div>
              <h4>Receiver</h4>
              <div>
                <label>
                  <strong>Cause Id:</strong>
                </label>{" "}
                {currentReceiver.cause_id}
              </div>
              <div>
                <label>
                  <strong>SSN:</strong>
                </label>{" "}
                {currentReceiver.receiver_ssn}
              </div>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentReceiver.receiver_name}
              </div>
              <div>
                <label>
                  <strong>Contact:</strong>
                </label>{" "}
                {currentReceiver.receiver_contact}
              </div>
              <div>
                <label>
                  <strong>Income:</strong>
                </label>{" "}
                {currentReceiver.receiver_income}
              </div>
              <div>
                <label>
                  <strong>Family:</strong>
                </label>{" "}
                {currentReceiver.receiver_family}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentReceiver.receiver_location}
              </div>

              <Link
                to={"/receivers/" + currentReceiver.cause_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Receiver</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}