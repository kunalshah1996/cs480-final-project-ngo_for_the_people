import React, { Component } from "react";
import FundsDataService from "../services/fund.service";

export default class Fund extends Component {
  constructor(props) {
    super(props);
    //this.onChangeFund_id = this.onChangeFund_id.bind(this);
    this.onChangeFund_Donor_id = this.onChangeFund_Donor_id.bind(this);
    this.onChangeFund_amount = this.onChangeFund_amount.bind(this);
    this.onChangeFund_status = this.onChangeFund_status.bind(this);
    this.getFund = this.getFund.bind(this);
    this.updateFund = this.updateFund.bind(this);
    this.deleteFund = this.deleteFund.bind(this);

    this.state = {
      currentFund: {
        fund_donation_id: "",
        fund_donor_id: "",
        fund_amount: "",
        fund_status: "",

      },
      message: ""

    };
  }

  componentDidMount() {
    this.getFund(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }



  onChangeFund_Donor_id(e) {
    const fund_donor_id = e.target.value;
    
    this.setState(prevState => ({
      currentFund: {
        ...prevState.currentFund,
        fund_donor_id: fund_donor_id
      }
    }));
  }

  onChangeFund_amount(e) {
    const fund_amount = e.target.value;
    
    this.setState(prevState => ({
      currentFund: {
        ...prevState.currentFund,
        fund_amount: fund_amount
      }
    }));
  }

  onChangeFund_status(e) {
    const fund_status = e.target.value;
    
    this.setState(prevState => ({
      currentFund: {
        ...prevState.currentFund,
        fund_status: fund_status
      }
    }));
  }

 

  getFund(id) {
    FundsDataService.get(id)
      .then(response => {
        this.setState({
          currentFund: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateFund() {
    FundsDataService.update(
      this.state.currentFund.fund_donation_id,
      this.state.currentFund
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Fund was updated successfully!"
        });
        alert("Updated successfull");
        window.location.href = '/funds'
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteFund() {    
      console.log(this.state.currentFund.donation_id)
    FundsDataService.delete(this.state.currentFund.fund_donation_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/funds')
        alert("Deleted successfully")
        alert("Updated successfully");
        window.location.href = '/funds'
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentFund } = this.state;

    return (
      <body id = "bg">
      <div>
        {currentFund ? (
          <div className="edit-form" id = "fifth">
            <h4 id = "fontc">Fund ID</h4>
            <form>
              <div className="form-group">
                <label htmlFor="fund_donation_id">Fund ID : </label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_donation_id"
                  value={currentFund.fund_donation_id}
                  onChange={this.onChangeFund_Donation_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fund_donor_id">Donor ID :</label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_donor_id"
                  value={currentFund.fund_donor_id}
                  onChange={this.onChangeFund_Donor_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fund_amount">Fund Amount :</label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_amount"
                  value={currentFund.fund_amount}
                  onChange={this.onChangeFund_amount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fund_status">Fund status :</label>
                <input
                  type="text"
                  className="form-control"
                  id="fund_status"
                  value={currentFund.fund_status}
                  onChange={this.onChangeFund_status}
                />
              </div>


              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteFund}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateFund}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Fund</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
