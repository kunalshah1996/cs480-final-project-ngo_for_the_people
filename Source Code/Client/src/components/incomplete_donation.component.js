import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setActiveDonation = this.setActiveDonation.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      donations: [],
      currentDonation: null,
      currentIndex: -1
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.retrieveDonation();
  }
  setActiveDonation(donation, index) {
    this.setState({
      currentDonation: donation,
      currentIndex: index
    });
  }

  retrieveDonation() {
    QueriesDataService.incomplete_donation()
      .then(response => {
        this.setState({
          donations: response.data.result
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveDonation();
    this.setState({
      currentDonation: null,
      currentIndex: -1
    });
  }

  render() {
    const { donations, currentDonation, currentIndex } = this.state;

    return (
        <div className="list row">
        <div className="col-md-6">
        <div>{donations.length == 0 &&
          <h4>No Pending Donation</h4>
            }
          </div>
          <div>{donations.length > 0 &&
          <h4>List</h4>
            }
          </div>
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
                  {donation.donor_name}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentDonation ? (
            <div>
              <h4>Donation</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentDonation.donor_id}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Employee</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}