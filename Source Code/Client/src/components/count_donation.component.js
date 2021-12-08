import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class CountDonation extends Component {
  constructor(props) {
    super(props);
    this.onChangeCount = this.onChangeCount.bind(this);
    this.showDonation = this.showDonation.bind(this);
    
    this.state = {
      donation_count: [],
      currentDonation: null,
      currentIndex: -1,
      submitted: false,
      countvalue: null
    };
    console.log(typeof this.state) 
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeCount(e) {
    this.setState({
      countvalue: e.target.value
    });
    //console.log(this.state)
  }
  setActiveDonation(donation, index) {
    this.setState({
      currentDonation: donation,
      currentIndex: index
    });
  }

  showDonation() {
    var data = {
        countvalue: this.state.countvalue,
      };
    this.setState({
        submitted: true
      });
    QueriesDataService.count_donation(data)
      .then(response => {
        this.setState({
          donation_count: response.data.result,
          submitted:true
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { donation_count,submitted,currentDonation,currentIndex} = this.state;
    //console.log(donation_count)
    return (
        <div>

              <div className="form-group">
                <label htmlFor="title">Enter Count :</label>
                <input
                  type="text"
                  className="form-control"
                  id="countvalue"
                  required
                  value={this.state.countvalue}
                  onChange={this.onChangeCount}
                  name="countvalue"
                />
              </div>
              <button onClick={this.showDonation} className="mt-3 btn btn-success">
                Submit
              </button>
              <div>{!donation_count &&
                <div>
                    <label>
                  <strong>No donation found greater than mentioned value </strong>
                </label>{" "}
                </div>

}</div>
              <div>{(submitted && donation_count) &&
            <div>
              <div className="col-md-6" id = "employee1" >
          <h4>List</h4>

          <ul className="list-group">
            {donation_count &&
              donation_count.map((donation, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDonation(donation, index)}
                  key={index}
                >
                  {donation.donation_type}
                </li>
              ))}
          </ul>
          <div className="col-md-6">
          {currentDonation ? (
            <div>
              <h4>Details:</h4>
              <div>
                <label>
                  <strong>Donation Type:</strong>
                </label>{" "}
                {currentDonation.donation_type}
              </div>
              <div>
                <label>
                  <strong>Total Count:</strong>
                </label>{" "}
                {currentDonation.TOTAL_COUNT}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Donation!</p>
            </div>
          )}
        </div>
        </div>
              
          {/* <div className="col-md-6">
                <label>
                  <strong>Count: </strong>
                </label>{" "}
                 {donation_count.TOTAL_COUNT}
              </div>
              <div className="col-md-6">
                <label>
                  <strong>Donation Type: </strong>
                </label>{" "}
                 {donation_count.donation_type}
                 
              </div> */}
           
           </div>
            }</div>
          </div>
            
    );
    }
}