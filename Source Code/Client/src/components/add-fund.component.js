import React, { Component } from "react";
import FundDataService from "../services/fund.service";

export default class AddFund extends Component {
  constructor(props) {
    super(props);
    this.onChangeFund_Donation_id = this.onChangeFund_Donation_id.bind(this);
    this.onChangeFund_Donor_id = this.onChangeFund_Donor_id.bind(this);
    this.onChangeFund_amount = this.onChangeFund_amount.bind(this);
    this.onChangeFund_status = this.onChangeFund_status.bind(this);
    this.saveFund = this.saveFund.bind(this);
    this.newFund = this.newFund.bind(this);

    this.state = {
      fund_donation_id: null,
      fund_donor_id: "",
      fund_amount: "",
      fund_status: "",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }
  onChangeFund_Donation_id(e) {
    this.setState({
        fund_donation_id: e.target.value
    });
  }
  onChangeFund_Donor_id(e) {
    this.setState({
        fund_donor_id: e.target.value
    });
  }
  onChangeFund_amount(e) {
    this.setState({
        fund_amount: e.target.value
    });
  }

  onChangeFund_status(e) {
    this.setState({
        fund_status: e.target.value
    });
  }



  
  saveFund() {
    var data = {
      fund_donation_id: this.state.fund_donation_id,
      fund_donor_id: this.state.fund_donor_id,
      fund_amount: this.state.fund_amount,
      fund_status: this.state.fund_status
    };
    FundDataService.create(data)
      .then(response => {
        this.setState({
          fund_donation_id: response.data.fund_donation_id,
          fund_donor_id: response.data.fund_donor_id,
          fund_amount: response.data.fund_amount,
          fund_status: response.data.fund_status,
          submitted: true
        });
        alert("Submitted successfully")
      })
      .catch(e => {
        alert(e);
      });
  }

  newFund() {
    this.setState({
        fund_donation_id: null,
        fund_donor_id: "",
        fund_amount: "",
        fund_status: "",
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
              <button className="btn btn-success" onClick={window.location.href = '/funds'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Fund ID : </label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_donation_id"
                  required
                  value={this.state.fund_donation_id}
                  onChange={this.onChangeFund_Donation_id}
                  name="fund_donation_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Donor ID :</label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_donor_id"
                  required
                  value={this.state.fund_donor_id}
                  onChange={this.onChangeFund_Donor_id}
                  name="fund_donor_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Fund Amount :</label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_amount"
                  required
                  value={this.state.fund_amount}
                  onChange={this.onChangeFund_amount}
                  name="fund_amount"
                />
              </div>


              <div className="form-group">
                <label htmlFor="title">Fund Status : </label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_status"
                  required
                  value={this.state.fund_status}
                  onChange={this.onChangeFund_status}
                  name="fund_status"
                />
              </div>

  
              <button onClick={this.saveFund} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}