import React, { Component } from "react";
import DonorDataService from "../services/donor.service";

export default class AddDonor extends Component {
  constructor(props) {
    super(props);

    this.onChangeDonor_id = this.onChangeDonor_id.bind(this);
    this.onChangeDonor_name = this.onChangeDonor_name.bind(this);
    this.onChangeDonor_ssn = this.onChangeDonor_ssn.bind(this);
    this.onChangeDonor_contact = this.onChangeDonor_contact.bind(this);
    this.saveDonor = this.saveDonor.bind(this);
    this.newDonor = this.newDonor.bind(this);

    this.state = {
      donor_id: null,
    //   donor_id: "",
      donor_ssn: "",
      donor_name: "",
      donor_contact: "",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeDonor_id(e) {
    this.setState({
        donor_id: e.target.value
    });
  }
  onChangeDonor_ssn(e) {
    this.setState({
        donor_ssn: e.target.value
    });
  }


  onChangeDonor_name(e) {
    this.setState({
        donor_name: e.target.value
    });
  }

  onChangeDonor_contact(e) {
    this.setState({
        donor_contact: e.target.value
    });
  }


  
  saveDonor() {
    var data = {
      donor_id: this.state.donor_id,
      donor_ssn: this.state.donor_ssn,
      donor_name: this.state.donor_name,
      donor_contact: this.state.donor_contact

    };

    DonorDataService.create(data)
      .then(response => {
        this.setState({
          donor_id: response.data.donor_id,
          donor_ssn: response.data.donor_ssn,
          donor_name: response.data.donor_name,
          donor_contact: response.data.donor_contact,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDonor() {
    this.setState({
        donor_id: null,
        donor_ssn: "",
        donor_name: "",
        donor_contact: "",
        submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/donors'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Donor ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_id"
                  required
                  value={this.state.donor_id}
                  onChange={this.onChangeDonor_id}
                  name="donor_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Donor SSN :</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_ssn"
                  required
                  value={this.state.donor_ssn}
                  onChange={this.onChangeDonor_ssn}
                  name="donor_ssn"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Donor Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_name"
                  required
                  value={this.state.donorname}
                  onChange={this.onChangeDonor_name}
                  name="donor_name"
                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Donor contact : </label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_contact"
                  required
                  value={this.state.donor_contact}
                  onChange={this.onChangeDonor_contact}
                  name="donor_contact"
                />
              </div>

  
              <button onClick={this.saveDonor} className="mt-3 btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
          
      );
  }
}