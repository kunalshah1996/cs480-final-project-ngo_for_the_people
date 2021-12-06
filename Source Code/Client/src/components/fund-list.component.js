import React, { Component } from "react";
import FundsDataService from "../services/fund.service";
import { Link } from "react-router-dom";
import '../fund.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFund_Donation_id = this.onChangeSearchFund_Donation_id.bind(this);
    this.retrieveFunds = this.retrieveFunds.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFund = this.setActiveFund.bind(this);
    this.removeAllFunds= this.removeAllFunds.bind(this);
    this.searchFund_Donation_id = this.searchFund_Donation_id.bind(this);

    this.state = {
      funds: [],
      currentFund: null,
      currentIndex: -1,
      searchFund: ""
    };
  }

  componentDidMount() {
    this.retrieveFunds();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchFund_Donation_id(e) {
    const searchFund_Donation_id = e.target.value;

    this.setState({
      searchFund_Donation_id: searchFund_Donation_id
    });
  }

  retrieveFunds() {
    FundsDataService.getAll()
      .then(response => {
        this.setState({
          funds: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveFunds();
    this.setState({
      currentFund: null,
      currentIndex: -1
    });
  }

  setActiveFund(fund, index) {
    this.setState({
      currentFund: fund,
      currentIndex: index
    });
  }

  removeAllFunds() {
    FundsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        alert(e);
      });
  }

  searchFund_Donation_id() {
    FundsDataService.findById(this.state.searchFund_Donation_id)
      .then(response => {
        this.setState({
          funds: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }
  addFund() {
    window.location="/addfund"
  }

  render() {
    const { searchFund_Donation_id, funds, currentFund, currentIndex } = this.state;

    return (
      <body id = "bg">
      <div className="list row" id = "first">
        <div className="col-md-8" id = "third">
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID of the Fund_Donation "
              id = "fourth"
              value={searchFund_Donation_id}
              onChange={this.onChangeSearchFund_Donation_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchFund_Donation_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addFund}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "fund1">
          <h4>List of Funds</h4>

          <ul className="list-group">
            {funds &&
              funds.map((fund, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFund(fund, index)}
                  key={index}
                >
                  {fund.fund_donation_id}
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
          {currentFund ? (
            <div>
              <h4>Fund</h4>
              <div>
                <label>
                  <strong>Donation ID:</strong>
                </label>{" "}
                {currentFund.fund_donation_id}
              </div>
              <div>
                <label>
                  <strong>Donor ID:</strong>
                </label>{" "}
                {currentFund.fund_donor_id}
              </div>

              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentFund.fund_amount}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFund.fund_status}
              </div>

              <Link
                to={"/funds/" + currentFund.fund_donation_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Fund</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}