import React, { Component } from "react";
import DonationsDataService from "../services/donation.service";
import { Link } from "react-router-dom";
import '../donation.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDonation_id = this.onChangeSearchDonation_id.bind(this);
    this.retrieveDonations = this.retrieveDonations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDonation = this.setActiveDonation.bind(this);
    this.removeAllDonations= this.removeAllDonations.bind(this);
    this.searchDonation_id = this.searchDonation_id.bind(this);

    this.state = {
      donations: [],
      currentDonation: null,
      currentIndex: -1,
      searchDonation: ""
    };
  }

  componentDidMount() {
    this.retrieveDonations();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchDonation_id(e) {
    const searchDonation_id = e.target.value;

    this.setState({
      searchDonation_id : searchDonation_id
    });
  }

  retrieveDonations() {
    DonationsDataService.getAll()
      .then(response => {
        this.setState({
          donations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveDonations();
    this.setState({
      currentDonation: null,
      currentIndex: -1
    });
  }

  setActiveDonation(donation, index) {
    this.setState({
      currentDonation: donation,
      currentIndex: index
    });
  }

  removeAllDonations() {
    DonationsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDonation_id() {
    DonationsDataService.findById(this.state.searchDonation_id)
      .then(response => {
        this.setState({
          donations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addDonation() {
    window.location="/adddonation"
  }

  render() {
    const { searchDonation_id, donations, currentDonation, currentIndex } = this.state;

    return (
      <body id = "bg">
      <div className="list row" id = "first">
        <div className="col-md-8" id = "third">
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID of Donation"
              id = "fourth"
              value={searchDonation_id}
              onChange={this.onChangeSearchDonation_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchDonation_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addDonation}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "donation1">
          <h4>List of Donations</h4>

          <ul className="list-group">
            {donations &&
              donations.map((donation, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDonation(donation, index)}
                  key={index}
                >
                  {donation.donation_id}
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
          {currentDonation ? (
            <div>
              <h4>Donation</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentDonation.donation_id}
              </div>
              <div>
                <label>
                  <strong>Donor ID:</strong>
                </label>{" "}
                {currentDonation.donation_donor_id}
              </div>

              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentDonation.donation_type}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDonation.donation_status}
              </div>

              <Link
                to={"/donations/" + currentDonation.donation_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Donation</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}