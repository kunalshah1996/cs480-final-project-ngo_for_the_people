import React, { Component } from "react";
import DonationDataService from "../services/donation.service";
import '../donation.css';
export default class AddDonation extends Component {
  constructor(props) {
    super(props);
    this.onChangeDonation_id = this.onChangeDonation_id.bind(this);
    this.onChangeDonation_Donor_id = this.onChangeDonation_Donor_id.bind(this);
    this.onChangeDonation_type = this.onChangeDonation_type.bind(this);
    this.onChangeDonation_status = this.onChangeDonation_status.bind(this);
    this.saveDonation = this.saveDonation.bind(this);
    this.newDonation = this.newDonation.bind(this);

    this.state = {
      donation_id: null,
      donation_donor_id: "",
      donation_type: "",
      donation_status: "",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }
  onChangeDonation_id(e) {
    this.setState({
        donation_id: e.target.value
    });
  }
  onChangeDonation_Donor_id(e) {
    this.setState({
        donation_donor_id: e.target.value
    });
  }
  onChangeDonation_type(e) {
    this.setState({
        donation_type: e.target.value
    });
  }

  onChangeDonation_status(e) {
    this.setState({
        donation_status: e.target.value
    });
  }



  
  saveDonation() {
    var data = {
      donation_id: this.state.donation_id,
      donation_donor_id: this.state.donation_donor_id,
      donation_type: this.state.donation_type,
      donation_status: this.state.donation_status
    };

    DonationDataService.create(data)
      .then(response => {
        this.setState({
          donation_id: response.data.donation_id,
          donation_donor_id: response.data.donation_donor_id,
          donation_type: response.data.donation_type,
          donation_status: response.data.donation_status,
          submitted: true
        });
        alert("Submitted successfully")
      })
      .catch(e => {
        alert(e);
      });
  }

  newDonation() {
    this.setState({
        donation_id: null,
        donation_donor_id: "",
        donation_type: "",
        donation_status: "",
        submitted: false
    });
  }

  render() {
    return (
      <body id = "bg">
        <div className="submit-form" id = "second">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/donations'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Donation ID : </label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_id"
                  required
                  value={this.state.donation_id}
                  onChange={this.onChangeDonation_id}
                  name="donation_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Donor ID :</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_donor_id"
                  required
                  value={this.state.donation_donor_id}
                  onChange={this.onChangeDonation_Donor_id}
                  name="donation_donor_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Donation Type :</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_type"
                  required
                  value={this.state.donation_type}
                  onChange={this.onChangeDonation_type}
                  name="donation_type"
                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Donation Status : </label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_status"
                  required
                  value={this.state.donation_status}
                  onChange={this.onChangeDonation_status}
                  name="donation_status"
                />
              </div>

  
              <button onClick={this.saveDonation} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}