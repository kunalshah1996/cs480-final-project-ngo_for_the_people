import React, { Component } from "react";
import DonorDataService from "../services/donor.service";
import { Link } from "react-router-dom";
import '../donor.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDonor_id = this.onChangeSearchDonor_id.bind(this);
    this.retrieveDonors = this.retrieveDonors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDonor = this.setActiveDonor.bind(this);
    this.removeAllDonors= this.removeAllDonors.bind(this);
    this.searchDonor_id = this.searchDonor_id.bind(this);

    this.state = {
      donors: [],
      currentDonor: null,
      currentIndex: -1,
      searchDonor: ""
    };
  }

  componentDidMount() {
    this.retrieveDonors();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchDonor_id(e) {
    const searchDonor_id = e.target.value;

    this.setState({
      searchDonor_id: searchDonor_id
    });
  }

  retrieveDonors() {
    DonorDataService.getAll()
      .then(response => {
        this.setState({
          donors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDonors();
    this.setState({
      currentDonor: null,
      currentIndex: -1
    });
  }

  setActiveDonor(donor, index) {
    this.setState({
      currentDonor: donor,
      currentIndex: index
    });
  }

  removeAllDonors() {
    DonorDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDonor_id() {
    DonorDataService.findById(this.state.searchDonor_id)
      .then(response => {
        this.setState({
          donors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addDonor() {
    window.location="/adddonor"
  }

  render() {
    const { searchDonor_id, donors, currentDonor, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by donor_id"
              value={searchDonor_id}
              onChange={this.onChangeSearchDonor_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDonor_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addDonor}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6">
          <h4>Donors List</h4>

          <ul className="list-group">
            {donors &&
              donors.map((donor, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDonor(donor, index)}
                  key={index}
                >
                  {donor.donor_id}
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
          {currentDonor ? (
            <div>
              <h4>Donor</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentDonor.donor_id}
              </div>
              <div>
                <label>
                  <strong>SSN:</strong>
                </label>{" "}
                {currentDonor.donor_ssn}
              </div>

              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDonor.donor_name}
              </div>
              <div>
                <label>
                  <strong>Contact:</strong>
                </label>{" "}
                {currentDonor.donor_contact}
              </div>

              <Link
                to={"/donors/" + currentDonor.donor_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Donor</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}